---
title: "CV.feature detectors and descriptors"
date: 2019-03-31 11:30:28
comment : true
categories: ComputerVision
---

1. good feature
Repeatability : 좋은 feature들은 같은 scene에서 서로 위치에서 보아도 should be detect in two or more이다. 즉 다른 각도에서 같은 장소나 같은 부분을 찍는다고 하더라도 바로 찾을 수 있어야 한다는 의미이다.<br>
Saliency : feature는 image에서 interesting한 부분을 가지고 있어야한다. interesting한 부분?<br>
Locality : feature는 small area<br>

2. unambigous for matching
이후의 processing을 위해서 모호성을 최대한 적게 만들어야한다.<br>
problem-> aperture prob.
	- this make us ambiguous for selecting orientation and direction of line, it means that if line looks like to move from upper left to down right but it may be already line is little twisted and just go from left to right<br>

3. Desining feature descrptors
there are several ways to design feature descrptiors<br>
first. Phtometic transformation : seems like to change color of image<br>
second. Geometric transformations : it is like taking images with several diffrent directions.<br><br>

using image patch, which is easy to understand like 1 pixel is a patch, and adding vector concept<br>
1 2 3<br>
4 5 6 ----> 1 2 3 4 |5| 7 8 9<br>
7 8 9<br>

or image gradient, which uses differences btw criterion value and the others
1 2 3<br>
4 5 6 --------------> (-++--+) this is a vector<br>
7 8 9<br>

Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
