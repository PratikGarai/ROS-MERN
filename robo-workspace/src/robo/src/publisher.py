#!/usr/bin/env python2

import rospy
from std_msgs.msg import String

def talker() :
    pub = rospy.Publisher("chatter", String, queue_size=10)
    rospy.init_node("talker", anonymous = True)
    rate = rospy.Rate(1)
    while not rospy.is_shutdown() :
        hello = "Hello World %s" % rospy.get_time()
        rospy.loginfo(hello)
        pub.publish(hello)
        rate.sleep()

rospy.loginfo("Program")
if __name__=='__main__':
    rospy.loginfo("Main")
    talker()
