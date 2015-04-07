---
layout: post
title: React Native - First Experience
---

<div class="page-header">
<h1>React Native: First Experience</h1>
</div>
My company recently implemented 10% time, and it conveniently started the same day that React Native was open sourced. I took the chance to play around with it a bit by making a simple iOS chess app. I've done barely any Objective C or Swift development, so this is all from the perspective of someone who writes a lot of React (in primarily Dart and some JS) and no native iOS code.

The source code for the project I made can be seen [here](https://github.com/csarsam/ReactNativeChess).

### Getting Started & Development Workflow
Getting a project up and running was lovely and smooth. I ran `react-native init` and immediately had a running iOS app. There was no need to even look at the Objective C files, although if you do look it's pretty clear all you need to do is specify your JS location and create a `RootView` with it. Development workflow was great - hitting `Command + R` in the iOS simulator triggers a reload of the JS with no relaunch of the application. Much, much faster than my Phonegap development experiences. Javascript exceptions were also nicely handled - the simulator shows you a nice stack trace with clickable line numbers.

### Layouts
The first learning curve I hit was in attempting to lay out my chessboard. I saw in the documentation that I could use flexbox for my layouts, read Chris Coyier's excellent [Guide To Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/), and banged out some styles. And then I was immediately confounded when everything looked terrible and didn't do what I had told it to. Eventually I re-read the documentation and realized that React Native implements *some* of flexbox - the `grow`, `shrink` and `order` properties I was trying to use are not supported. Percent-based measurements are also not supported. Once I got used to the subset of CSS that I had at my disposal, layouts went fairly smoothly and I didn't run into anything I couldn't do.

### Animations
Native animations was one of the features I was most excited about. I've used Phonegap for a few projects and animations in the webview were one of the clearest sore thumbs. React Native provides two animation APIs, `Animation` and `LayoutAnimation`. I used the former to animate piece movements.

![](http://imgur.com/QE5QqPV.gif)

I think this specific API is actually being removed/changed, but here's what an animation with it looks like:

{% highlight javascript %}
Animation.startAnimation(this.refs['this'], 500, 0, 'easeInOutCirc', {position: [x, y]});
{% endhighlight %}

The position coordinates look the same way they would in the DOM - (0, 0) is the upper left corner of the screen, not the center. The second argument is the animation duration, and the second is the delay. I also used animations to fade in the chessboard and pieces by animating the `opacity` property.

### Miscellaneous

* JavaScript language features - the js in React Native is run in JavaScriptCore, which implements ECMAScript 5.1.
* You can hit `Command + D` in the simulator to debug your JavaScript with Chrome dev tools.

### Conclusions

Using React Native was great in all the ways that using React is great - UI code is declarative, state is explicit, and UI implementation details are abstracted away into components. It was a much different experience than any other cross-platform native app solution I've used before - writing JS for iOS with React Native felt natural and solid. I have run into a few bugs, but I've gotten quick responses from contributors on Github in every case. Overall this was a really fun experiment, and I'm looking forward to doing some more in-depth work with it and seeing the APIs evolve. Next I'm planning to do some integration with a backend, likely with [Parse](https://www.parse.com/).




