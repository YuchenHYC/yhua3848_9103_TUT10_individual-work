# yhua3848_9103 TUT10 individual work
## Instructions on how to interact with the work



## Details of animating the group code

### Description:
I choose **interaction** as the way of animation. This is done by incorporating mouse or keyboard inputs. 

highlight the difference:

References to inspiration for animating my individual code



### Technical explanation:

***About the buffer:***

Since the animation is based on the persistent refreshment of the sketch, and our group work set fixed positions to nearly all elements (apples, trunk, and gound) in the sketch, I found that simply adding an animation through class was not a good way to achieve the ideal outcome because it would intervene some parameters of the original artwork used random and loops. Therefore, Yishu and I tried to transform the group work into a part of the background, which made it unable to influence the operation of animation. We achieved it through method [*createGraphics()*](https://p5js.org/reference/#/p5/createGraphics), which creates an offscreen drawing canvas (graphics buffer) and returns it as a p5.Graphics object. Similarly, if I want to change some tree elements per se, I need to put them out of the buffer box.
>


