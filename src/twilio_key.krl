ruleset com.blacklite.krl.twilio.key {
  meta {
    name "Twilio Key Module"
    key twilioKeys {
      "account_sid" : <<YOUR_ACCOUNT_SID_HERE>>,
      "auth_token" : <<YOUR_AUTH_TOKEN_HERE>>
    }

    provide keys twilioKeys to com.blacklite.krl.twilio
  }
}
