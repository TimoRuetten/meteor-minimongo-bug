meteor-reactivity-bug
=====================

meteor minimongo $near bug


When start your app your sonsole show the following outputs:

+ Items found (Before subscribe): 0 
+ Items found (After subscribe WITHOUT query): 1
+ Items found (After subscribe WITH query): 0
+ Items found (After subscribe AND Timeout WITHOUT query: 1
+ Items found (After subscribe AND Timeout WITH query: 0 


The Problem
====

When using the same uery on Server & client the results are not equal. On client side the $near operation is not working
