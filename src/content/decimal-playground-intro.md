---
template: essay
---

# Introducing _Building the Decimal Playground_

This was supposed to be a different piece. It was going to be called _Announcing the Decimal Playground_ and was intended to be posted to the [Igalia Compilers team blog](https://blogs.igalia.com/compilers/), with links to the posts about the project that would (and do) live here on my revamped essays site.

However, life and opportunity have intervened, and I am leaving Igalia for a new challenge. But I did not want to lose the notes and tips that comprise the record of this project. It was an interesting project, and I hope that by providing a narrative and examination here, I can encourage others with ideas about additions to Javascript to test them out and share. Maybe even someday I can package this code up into a starter kit. And when the new champions are ready, should they choose, they can also share the essays here.

In the meantime, this introduction will sketch the context of this project: [the Decimal Proposal](https://github.com/tc39/proposal-decimal), currently in [Stage 1 of the TC39 Process](https://tc39.es/process-document/).

The following chapters then cover:

- [the set-up, goals, and assumptions underlying the project](/decimal-playground-setup)
- [a closer look at transforming code with Babel](/decimal-playground-babel)
- [an examination of run-time functionality implementation](/decimal-playground-runtime)
- [a wrap-up with bullet-point highlights and a short reflection](/decimal-playground-wrap-up)

## The Playground as Part of the Process

TC39 is the committee governing the Javascript specification; when member companies have ideas they want to see added to the language, these move through the listed stages with the agreement of other members. That means anyone wanting to reach the conclusion of the process — an implemented addition — needs to be very clear about what they want to add and to convince others that this is a needed addition.

In order to suss out some proposal details, it can help to have an inspectable version of the proposal. At the same time, to help deepen our knowledge of how the proposal feels, it can help to implement it and write examples ourselves. One way to do both together is to create a playground: a web-based REPL that implements the proposal.

So what's in the thing?

## The Decimal Proposal

Have you ever seen people making fun of Javascript by showing how you can enter `0.1 + 0.2` into a console and get back `0.30000000000000004`? Well, that's not just Javascript's fault: it's how all numbers implemented using [floating-point representations](https://en.m.wikipedia.org/wiki/IEEE_754) work. ([This is a great video that explains why](https://www.youtube.com/watch?v=wPBjd-vb9eI) and you should really just stop here to watch it.)

Most of the time, this isn't actually a big deal. But when one is doing computations where precision, especially precision of small values, is the _most_ important thing — things like calculations of money — the imprecision of the floating point can become a real problem.

Luckily, there is a known solution: adding a Decimal data type. Then we could write something like: `0.1m + 0.2m` and get `0.3m` back.

But how should this data type be represented? I came into this process mid-stream, so the three options on the table were already given: as a non-primitive type using operator overloading; as a 128-bit Decimal representation; or as a BigDecimal. Since Javascript does not have operator overloading currently and this approach would still not work completely, as comparisons like `===` cannot be overloaded, I chose not to dig more deeply into the first.

This left the Decimal128 and BigDecimal options. The primary distinction here is that the latter is able to represent values of any size, whereas the former would be limited to those that could be represented in 128 bits. While it might seem that the unlimited version is the obvious front-runner, not having a limit actually pushes concerns about rounding to the fore. Consider the values return by `1/3` and `-1/3`. How many repeating 3s should the computer store? Which rounding method should it use when it truncates? Should both round towards 0? Should all fractions round up?

How should the rounding be specified? Should users only be able to do operations that could involve rounding by calling a method, to which rounding options could be passed? To be more concrete, should the only way of dividing be:

```js
Decimal.divide(1, 3, {maximumFractionDigits: 10, roundingMode: "up"})
```

or is a limited storage size worth being able to write

```js
1m/3m
```

But of course there is functionality beyond this question that we would expect to be less controversial. Outside the question of whether the `/` will exist, both proposals include binary arithmetic operators — `+`, `-`, `*` — and comparison operators — `>` , `>=`, `<`, `<=`, `==`, `===`. When used with mixed value types, the arithmetic operators will throw — except `+` with a  Decimal and string will concatenate.

Unary operators `-` and `typeof` are supported, but `+` is not.

The initial `Decimal` constructor methods are proposed to be `.round`, `.remainder`, `.pow`, and possibly `.partition`; and for the prototype methods `toFixed`, `toExponential`, `toPrecision` and `toLocaleString` will be available. All of these will take an options object, which will specify the maximum number of fractional digits and the rounding method that should be deployed to get there. For instance:

```js
const d = 1.289038754839209m;
const r = Decimal.round(d, {maximumFractionDigits: 4, roundingMode: "half-even"}) // ↪️ "1.289"
```

Decimal values are expected to work as keys for Maps and Sets. They should work like other Javascript primitives, and `0m` ought to be falsey. Values will be normalized and `1.m`, `1.0m`, and `1.0000000m` will all be equivalent.

---

This quick list gives a general sense of the size of the proposal and the systems it touches.

Will any of this be controversial? What have we forgotten? You can see how rather than trying to answer these questions by thinking really hard or interviewing other devs and asking them to think really hard, we might build a playground and try it out.

So let's move on to [Building the Decimal Playground 1: Babel and Proxies and Variables, Oh My!](/decimal-playground-setup) and see how that was structured.
