window.config = {
  "server_host": "localhost:8080",
  "protocol": "http://",
  "default_eci": "3oV16pSt8aXB1XfrQWeCNQ", //This can be changed to your temperature pico eci

  //ruleset name where you are storing data
  "temp_store_rid": "com.blacklite.krl.temperature_store",
  //in the above ruleset, what function returns an array of temperature objects?
  "temperature_func": "temperatures",

  "violation_func": "threshold_violations",
  "profile_rid": "sensor_profile",
  "profile_func": "get_all"
};
