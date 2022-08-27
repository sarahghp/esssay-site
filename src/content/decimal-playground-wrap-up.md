---
template: essay
---

# Building the Decimal Playground 4: Wrap-Up

The previous sections have presented a somewhat wandering journey through the creation of the [Decimal Playground](https://sarahghp.github.io/decimal-playground/) covering why we did it; our goals and general app setup; using Babel to transform user code; and the various run-time interventions we used to implement the proposed functionality.

This last chapter is a roundup of some of the top points and a bonus reflection.

## Set-Up

* A playground needs to take input, transform it into runnable Javascript, and then evaluate that Javascript to give the full experience.

* A cool way to make the playground sharable without spinning up a database is to add the encoded text to the URL — makes for some long URLs, though.

* Monaco can take a bit of futzing to get rid of what it thinks are errors (instead of knowing it's future Javascript).

## Transforming

* Use AST explorer to understand what you are transforming and to discover the names of the structures you are translating into.

* You can get pretty far into implementing your plugin with the explorer and these three resources: [step-by-step tutorial from Tan Li Hau](https://lihautan.com/step-by-step-guide-for-writing-a-babel-transformation/); [the Babel Plugin Handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md); [`@babel/types` package API documentation](https://babeljs.io/docs/en/babel-types.html).

* Visitors have both `enter` and `exit` methods. `enter` is the default.

* Use `path.buildCodeFrameError` to throw great errors. Pass it along to runtime code to include great errors detected at run time.

* `path.get` is great if you need replace subpaths; otherwise working directly with the `node` and `t` for convenience functions can be cleaner, especially with currying.

* Variables make everything more complicated because they are not resolved until run time. It can be reasonable to repeat some code to handle this.

## Runtime

* Use a top-level `import` and pass the global object as an argument to limit usage of globals.

* Proxies are a nice way to intervene programmatically into other code. [The _Looking at All 13 JavaScript Proxy Traps_ tutorial](https://www.digitalocean.com/community/tutorials/js-proxy-traps) from Digital Ocean and [the ExploringJS chapter on proxies ](https://exploringjs.com/es6/ch_proxies.html#sec_proxies-explained) are great resources to understand them better.

* Proxy a function that throws an error when your base case is an error. Elegant and charming.

* Using an object to represent a Decimal value can cause lots of small places where we need to intervene to keep Javascript working as expected: especially conditionals and comparisons.

* Making `Math` methods polymorphic is a cool idea [currently under discussion](https://github.com/tc39/proposal-bigint-math).

## Bonus Reflection: Matching Javascript

There is one last set of thoughts that I could not fit in anywhere else, but occupied me as I implemented the Decimal functionality specified (and some not). As Javascript has developed across the years, dynamic programming has fallen somewhat out of fashion and loose-ness and coercion have been    replaced with throwing a lot more errors. In the case of the Decimal playground, where we chose to rely on existing libraries to replicate a primitive, we could find ourselves in some funny positions.

I have written before about the trouble with objects in comparisons, but my favorite question came up with the statement: `19m < "a"`. If you try this in your browser consoles or the playground with a BigInt or a Number — `19n < "a"`, `19 < "a"` — you will see that it is a question that Javascript is willing to answer. If you try the Decimal version in the playground, you will get a constructor error. That's because the library thinks it is an unreasonable question to ask and in the urge to get out something for people to play with, we've chosen not to match this corner case for now.  

Should we though? Which makes the most sense? Is it logical to want to compare a number and a letter? Should we assume that by doing this, the user has made an error, and therefore we should help them by surfacing it? Or is it better to support different approaches we can't expect by just returning `false` for `<` and `>`?

I don't ask these questions to answer them here, but to point out what I've gained most from implementing a lightweight Decimal — an opportunity to dig into the corner cases of Javascript conversion and a chance to think about what we are matching in Javascript when we add a new feature and when we argue for a primitive versus an object or method.

As Javascript continues to grow, knowing these cases and considering where to match the existing grain and where to diverge will continue to be an important area. Writing playground implementation can deepen your understanding in a way that just reading or thinking about other languages cannot.

That's my last hot take.


## It's Really Over

If you read straight through: Thanks for sticking with me for the whole thing!

If you started here: I hope some of this entices you to check out the longer articles.

Either way, if you have some ideas for what you want to see in Javascript — even crazy ones — I encourage you to fork this repo; pop open AST explorer; and replace all my transforms and runtime interventions with your own.

And if you are interested in the Decimal proposal itself, [visit the repo](https://github.com/tc39/proposal-decimal) and get involved.

As for me, my time in the language track is coming to an end. But I don't regret the time spent on this playground one bit.
