
<centre>
    <img src='./logo.png'>
    <h1><bold>Coat.JS</bold></h1>
</centre>

# A light ass (130 lines) alternative of big ass taillwind
No need to type exact css property. Coat.js autocompletes

```
<div coat="m-1vw p-1vw">😄</div> -> <div style="margin:1vw; padding:1vw;">😄</div>
<div coat="mar-1vw pad-1vw">😄</div> -> <div style="margin:1vw; padding:1vw;">😄</div>
<div coat="mar-1vw pa-1vw">😄</div> -> <div style="margin:1vw; padding:1vw;">😄</div>


<div coat="bo-0.1vw-solid-#555">😄</div> -> <div style="border:0.1vw solid #555;">😄</div>
<div coat="bor-0.1vw-solid-#555">😄</div> -> <div style="border:0.1vw solid #555;">😄</div>


<div coat="borderr-1vw">😄</div> -> <div style="border-radius:1vw">😄</div>
<div coat="borderRa-1vw">😄</div> -> <div style="border-radius:1vw">😄</div>

```

# How to use?

Just inlude coat.js and forget about it. No configuration needed

```
import {coat} from 'https://cdn.jsdelivr.net/gh/itsarnavsingh/coat/coat.js'

or

<script type="module" src="https://cdn.jsdelivr.net/gh/itsarnavsingh/coat/coat.js"> </script>

```
<h3>Get your hands dirty with demo files @ ./demos/</h3>

# Motivations

* less CSS best CSS
* mobile first css library
* easy inline media query
* replace big ass tailwind
* tailwind was not designed with webcomponents in mind, coat.js is compatible will all component library because of the way it works

# FAQ

<h3>What if dom is updated? can coat.js handle that?</h3>
Coat.JS listens for dom changes and parses coat style for only that element. No unnecessary processing is done 