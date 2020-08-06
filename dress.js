/*

How it works?
splits the css by using dash
loops through background.style properties the first key that matches the css is applied

How to use it?
<div style="coat('ba-#fff')">
Gives background as white
</div>


remove mutation listener and add style sheet

*/





function addToStyleSheet(selector,values){
    if(!window.coatStylesheet) window.coatStylesheet = document.head.appendChild( document.createElement("style") ).sheet
    coatStylesheet.insertRule(selector + "{" + values + "}");
}

function addPrefixToSelector(val){
    if(!val) return val
    val = val.replace('pc_','').replace('tablet_','')
    if(val.charAt(0) == '.' || val.charAt(0) == '.') return val
    if(val.indexOf('<') !== -1){
        return val.replace('<','').replace('>','')
    }
    return '.'+val
}


let mainDrees = {}

let dress = new Proxy({},{set:function(obj, key, value){
    
    mainDrees[key] = value

    function setMediaQuery(code){
        if(key.indexOf('pc_') !== -1) addToStyleSheet('@media (min-width: 1300px)', code)
        if(key.indexOf('tablet_') !== -1) addToStyleSheet('@media (min-width: 1300px)', code) 
    }

    if(key.indexOf('pc_') !== -1 || key.indexOf('tablet_') !== -1 ){
        setMediaQuery(
         `
            ${addPrefixToSelector(key)}{
                ${wear(value,false)}
            }
        `)
    }else{
        console.log(key, value,'as')
        addToStyleSheet(addPrefixToSelector(key),wear(value,false) ) 
    }

    
    return true
}})


function replaceGlobally(original, searchTxt, replaceTxt) {
    const regex = new RegExp(searchTxt, 'g');
    return original.replace(regex, replaceTxt) ;
  }

 function wear(originalClass,inlineMediaQuery){

    let classes = originalClass
    if(inlineMediaQuery !== false) inlineMediaQuery = true

    console.log(mainDrees)
    for(let key in mainDrees){
        console.log(key)
        classes = replaceGlobally(classes,';','') 
        classes = replaceGlobally(classes,key,mainDrees[key]) 
    }


    classes = classes.split(' ')

    let style = ''

    let actualClasses = []
    let currentClass = 0
    for(let i=0; i<classes.length; i++){

        if(!actualClasses[currentClass]) actualClasses[currentClass] = ''

        actualClasses[currentClass] +=  classes[i]+' '

        if(classes[i+1]){
            if(classes[i+1].indexOf(':') !== -1) currentClass++
        }
    }
    
    
    for(let cls of actualClasses){
        cls = cls.trim()
        if(!cls) continue
        //only apply the style if style is for phone or the type matches


        if(originalClass.indexOf('pc_') !== -1 || originalClass.indexOf('tablet_') !== -1){
            cls = cls.replace(type+'pc_','').replace(type+'tablet_','')
            cls += '!important'
        }

        let claSplit = cls.split(':')

        //hyphen is used istead of colon because people might give space after hyphen and reading hyphen is easy
        
        let property = claSplit[0]
        let value = claSplit[1] 
        
        if(value) value = value.trim()
        value = ' '+value
        let registeredValues = {
            xxs:'3px',
            xs:'7px',
            s:'14px',
            m:'21px',
            l:'28px',
            xl:'35px',
            xxl:'42px',
            xxxl:'49px',
        }
        
        if(registeredValues[value.trim()]) value = registeredValues[value.trim()]
        style += getInlineStyle(property,value)
    

    }

    //if device is other than phone & type is inline, load media query css as well 

    let screenType
   
    //mobile first media query implementation
    //phones style (the one that has no prefix) will be applied all the time
    
    screenType = screen.width > 1350? 'pc': 'tablet'
    if(screen.width < 812) screenType = 'phone'

    if(inlineMediaQuery == true && (screenType == 'tablet' || screenType == 'phone' ) && originalClass.trim().split(' ').length == 0){
        style += wear('pc_'+originalClass)
        style += wear('tablet_'+originalClass)
    }
    return style
}

window.wear = wear

function isCalpitalLetter(letter){
    return letter !== letter.toLowerCase();

    //we could have also used the fact: every number between [65, 90] is a capital letter:
}

function JS_to_CSS_property(property){

    property = property.split('')
    let spliceAt = []

    for(let i=0;i< property.length; i++){
        if( isCalpitalLetter(property[i]) ){
            spliceAt.push(i)
        }
    }

    for(let index of spliceAt){
        property.splice(index, 0, '-');
    }

    return property.join('').toLowerCase()
}



let template = document.createElement('div')

function capitalize(name){
    if(!name) return name
    return name.charAt(0).toUpperCase() + name.slice(1)
}

//short hands must not be learned, just the patterns need to be learned

function getInlineStyle(property,value){

    

    

    let possibleProperties = []

    let parts = JS_to_CSS_property(property).split('-')
    let firstPart = parts[0]
    let secondPart = capitalize(parts[1]) 
    //shorter string will have higher rank as shorter strings are used more freuently

    let specialProperties = {b:'background',c:'color',m:'margin'}
    
    if(specialProperties[property]){
        possibleProperties.push(specialProperties[property])
    }else{
        for(let key in template.style){
        
            if(key.substr(0,firstPart.length).toLowerCase() == firstPart  ) {

                if(secondPart){
                    if(key.indexOf(secondPart) !== -1) possibleProperties.push(key)
                }else{
                    possibleProperties.push(key)
                }
                
            }
        }
    }


    possibleProperties.sort((a,b)=> a.length-b.length)

    if(!possibleProperties[0]){
        console.warn(`For property ${property} no mapping exist`)
        return ''
    } 
    return `
    ${JS_to_CSS_property(possibleProperties[0])}:${value};`
}



export {dress,wear}