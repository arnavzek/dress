
<p align="center">
    <img src='./logo.png'>
</p>
<p align="center">Dress.JS</p>

# A light ass CSS runtime autocompleter
When you run your file, Dress.js autocompletes CSS you wrote in JS and turns them into a stylesheet.

# How to use?

Import Dress.js from CDN (not yet on NPM, sorry!)

```
import {dress} from 'https://cdn.jsdelivr.net/gh/itsarnavsingh/dress/dress.js'

or

<script type="module" src="https://cdn.jsdelivr.net/gh/itsarnavsingh/dress/dress.js"> </script>

```
Write CSS, just in two to three words.<br>
```
background can be written as b,back,backg,background.....
background-color can be written as bC,backC,backColo,backgroundColor...
```
<br><br>
note: capital c in the second example is important, letter after hyphen must be capital in shorthand
note: it is recommended to only use three letters for maintaining consistency in a team
<br><br>
When there are multiple candidates for a shorthand, the shorter one will be given benifit of doubt<br>
like if you type "ma", both mask and margin will be possible candidates. Mask will be choosen as it is shorter
but margin is more often used. so, most used properties have been registered to one letter shorthand<br>
m means margin <br>
b means beackground <br>
c means color <br>
p means padding <br>
<br>
There are over 520 CSS properties, all of them can be referenced by only this much knowledge
<br>

# Example
<img src='./demo.png'>

```
 
    //JS
    import {dress} from '../dress.js'

    dress.main = '  c:#fff bSha:1vw 1vw 1vw #0000005c  mTo:2vw ov:hidden bRa:5vw w:62% b:#000 pBo:2vw'
    dress.image = 'pI:center bRa:100vw m:2vw w:12vw  h:12vw b:#000 flo:left'
    dress.title = ' fS:xl  fS:xl mTo:1vw mBo:1vw'
    dress.desc = ' fS:m m:1vw w:60% flo:left fS:l transi:0.25s ease-in'
    dress['<body>'] = "fFa:roboto  di:grid pI:center b:linear-gradient(45deg, #CDDC39, #FFC107)"
    dress['desc:hover'] = 'tr:scale(0.8)'
   
     

    //HTML
    <body>

        <div class="main">
            
            <img class="image" src="./card.jpg">

            <div class="desc ">

                <h3 class="title"> Contact Forrest </h3>

                Forrest is an old guy, He is slowly dying.
                He is really a good person, He cares about everyone
                Even though we have hurt him so much, He still loves us

            </div>
        
        </div>

    </body>

```






<h3>Get your hands dirty with demo files @ ./demos/</h3>

# Media Query
Dress.js is Mobile First

Prefix 'pc_' For Laptops and PC

Prefix 'tablet_' For Tablets

```
//example
dress.pc_body = "b:#999"
```


# Motivations

* Adding external style to shadow dom element while keeping its shadow dom styles by using wear() function 
* Less CSS is easy to manage
* Keeps media query of element at the same place, like SASS. In standard css you are required to separte them by 100s of lines
* Because this is a CSS in JS library you can all the logics without a preprocessor like SASS 
* Mobile first in no brainer, cause make simple thigs complicated is easier than making complicated things simple
* Easy inline media query just call wear() it can reference call name as well as css property. classes can be used as property itself
* Designed with best practices in mind, thats why, default css selector is classes  
* Dress.js is compatible will all component library because of the way it works

# FAQ

<h3>What if dom is updated? can dress.js handle that?</h3>
Yes, Dress.js adds css rule to stylesheet as soon as it is declared