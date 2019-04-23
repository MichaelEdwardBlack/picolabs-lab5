ruleset com.blacklite.sensor_profile {
  meta {
    name "Sensor Profile"
    author "Michael Black"
    shares get_profile, __testing
  }
  global {
    get_profile = function() {
      { "name": ent:name.defaultsTo("First Sensor"),
        "location": ent:location.defaultsTo("Timbuktu"),
        "contact": ent:contact.defaultsTo("17195390627"),
        "threshold": ent:threshold.defaultsTo(90) }
    }

    __testing = { "queries":
      [ { "name": "__testing" },
        { "name": "get_profile"}
      ] , "events":
      [ //{ "domain": "d1", "type": "t1" }
      //, { "domain": "d2", "type": "t2", "attrs": [ "a1", "a2" ] }
      ]
    }
  }

  rule update_profile {
    select when sensor profile_updated

    noop()

    fired {
      ent:name := event:attrs{"new_sensor_name"} || ent:name || "First Sensor";
      ent:location := event:attrs{"new_location"} || ent:location || "Timbuktu";
      ent:contact := event:attrs{"new_send_to"} || ent:contact || "17193580627";
      ent:threshold := event:attrs{"new_threshold"} || ent:threshold || 90;

      raise wovyn event "set_threshold"
        attributes {"new_threshold": ent:threshold}
    }

  }
}
