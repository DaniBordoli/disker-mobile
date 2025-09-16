package com.disker.mobile.tiktok

import android.app.Activity
import android.content.Intent
import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.module.annotations.ReactModule

// TikTok Open SDK (Login Kit) imports
import com.tiktok.open.sdk.auth.AuthApi
import com.tiktok.open.sdk.auth.AuthRequest
import com.tiktok.open.sdk.auth.utils.PKCEUtils

@ReactModule(name = TikTokModule.NAME)
class TikTokModule(private val ctx: ReactApplicationContext) : ReactContextBaseJavaModule(ctx) {
  companion object {
    const val NAME = "TikTokModule"
    private const val TAG = "TikTokSDK"

    // Config - replace if needed
    private const val CLIENT_KEY = "sbaw11v8bbfp5avb7d"
    private const val REDIRECT_URI = "https://disker-tiktok-links-8q7uw5l95-danibordolis-projects.vercel.app/oauth/tiktok/callback"

    // Pending state for callback resolution
    @Volatile private var pendingPromise: Promise? = null
    @Volatile private var pendingCodeVerifier: String? = null

    // Exposed for MainActivity to forward the incoming intent
    fun onNewIntent(activity: Activity, intent: Intent) {
      Log.d(TAG, "onNewIntent received: $intent")
      try {
        val promise = pendingPromise ?: return
        Log.d(TAG, "Pending promise exists, attempting to parse AuthResponse...")
        val codeVerifier = pendingCodeVerifier
        val authApi = AuthApi(activity)
        val resp = authApi.getAuthResponseFromIntent(intent, REDIRECT_URI)
        if (resp == null) {
          Log.d(TAG, "Intent did not contain TikTok AuthResponse. Ignoring.")
          return // not our callback
        }

        val authError = resp.authError
        if (!authError.isNullOrEmpty()) {
          Log.d(TAG, "Auth error: ${'$'}authError desc=${'$'}{resp.authErrorDescription}")
          promise.reject("TIKTOK_AUTH_ERROR", resp.authErrorDescription ?: authError)
        } else {
          Log.d(TAG, "Auth success. Code present=${!resp.authCode.isNullOrEmpty()} granted=${resp.grantedPermissions}")
          val map = Arguments.createMap().apply {
            putString("authCode", resp.authCode)
            if (!codeVerifier.isNullOrEmpty()) putString("codeVerifier", codeVerifier)
            // Include granted permissions back to JS
            try {
              val arr = Arguments.createArray()
              val grantedStr = resp.grantedPermissions
              if (!grantedStr.isNullOrEmpty()) {
                grantedStr.split(',').map { it.trim() }.filter { it.isNotEmpty() }.forEach { perm ->
                  arr.pushString(perm)
                }
              }
              putArray("grantedPermissions", arr)
            } catch (_: Throwable) {}
          }
          promise.resolve(map)
        }
      } catch (t: Throwable) {
        Log.d(TAG, "Exception parsing AuthResponse: ${'$'}{t.message}")
        pendingPromise?.reject("TIKTOK_PARSE_ERROR", t.message, t)
      } finally {
        // clear pending state
        pendingPromise = null
        pendingCodeVerifier = null
      }
    }
  }

  override fun getName() = NAME

  @ReactMethod
  fun login(scopes: ReadableArray, promise: Promise) {
    val activity = currentActivity
    if (activity == null) {
      Log.d(TAG, "login called but currentActivity is null")
      promise.reject("NO_ACTIVITY", "No current activity available")
      return
    }

    try {
      Log.d(TAG, "Starting TikTok login with scopes: ${'$'}scopes")
      // Convert scopes array to comma-separated list per docs
      val scopeList = mutableListOf<String>()
      for (i in 0 until scopes.size()) {
        val v = scopes.getString(i)
        if (v != null && v.isNotEmpty()) scopeList.add(v)
      }
      val scopeStr = scopeList.joinToString(separator = ",")

      // Generate PKCE code verifier
      val codeVerifier = PKCEUtils.generateCodeVerifier()
      Log.d(TAG, "Generated PKCE codeVerifier length=${'$'}{codeVerifier.length}")

      // Build request
      val request = AuthRequest(
        clientKey = CLIENT_KEY,
        scope = scopeStr.ifEmpty { "user.info.basic" },
        redirectUri = REDIRECT_URI,
        codeVerifier = codeVerifier
      )
      Log.d(TAG, "AuthRequest built with clientKey=${'$'}CLIENT_KEY redirectUri=${'$'}REDIRECT_URI scope=${'$'}scopeStr")

      // Keep promise and codeVerifier for callback
      pendingPromise = promise
      pendingCodeVerifier = codeVerifier

      // Launch TikTok authorization via app
      val authApi = AuthApi(activity)
      Log.d(TAG, "Invoking authApi.authorize(...) via TikTok app")
      authApi.authorize(request)
    } catch (t: Throwable) {
      Log.d(TAG, "Exception during authorize: ${'$'}{t.message}")
      pendingPromise = null
      pendingCodeVerifier = null
      promise.reject("TIKTOK_AUTHORIZE_FAILED", t.message, t)
    }
  }
}
