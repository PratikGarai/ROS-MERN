#!/usr/bin/env python

import rospy
from std_msgs.msg import String

def callback(data):
    rospy.loginfo("Data received : "+ data.data)

def listener():
    pub = rospy.Subscriber("chatter", String, callback)
    rospy.init_node("listener", anonymous = True)
    rospy.spin()

rospy.loginfo("Staring Listener... ")
listener()
