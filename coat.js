/*
coat.js

How it works?
splits the css by using dash
loops through background.style properties the first key that matches the css is applied

How to use it?
<div style="coat('ba-#fff')">
Gives background as white
</div>

*/

window.addEventListener('load',()=>{

    const observer = new MutationObserver((mutationsList)=>{
        

        for(let mutation of mutationsList){
            // console.log(mutation.target, mutation.type, mutation.attributeName )
            if(mutation.type == 'attributes'){
                if(mutation.attributeName == 'coat') domUpdated(mutation.target)
            }else{
                domUpdated(mutation.target)
            }
        }

    });

    const config = { attributes: true, childList: true, subtree: true };
    // Start observing the target node for configured mutations
    observer.observe(document.body, config);
    observer.observe(document.body, config);observer.observe(document.body, config);observer.observe(document.body, config);
    // Later, you can stop observing
    //observer.disconnect();

    domUpdated()

    function domUpdated(element){
        //console.log('dom updated')
        if(!element) element = document.body

        let coatAttribute = element.getAttribute && element.getAttribute('coat')
        if(coatAttribute){
            element.setAttribute('style', coat(coatAttribute) )
            element.removeAttribute('coat')
        } 
        
        if(!element.children) return

        for(let child of element.children){
            if(child.shadowRoot){
                observer.observe(child.shadowRoot, config)//even if a observer method is called twice on shdowRoot, it is handled by  MutationObserver
                
                domUpdated(child)
                return domUpdated(child.shadowRoot)
            }

            domUpdated(child)
        }
    }

    return

})

let extraCoat = {}

export {extraCoat,coat}

function replaceGlobally(original, searchTxt, replaceTxt) {
    const regex = new RegExp(searchTxt, 'g');
    return original.replace(regex, replaceTxt) ;
  }

 function coat(classes){


    for(let key in extraCoat){


        classes = replaceGlobally(classes,key,extraCoat[key]) 
    }


    classes = classes.split(' ')

    let style = ''

    let type
   
    //mobile first media query implementation
    //phones style (the one that has no prefix) will be applied all the time
    
    type = screen.width > 1500? 'pc': 'tablet'
    if(screen.width < 812) type = 'phone'
    //the order is important

    //console.log(classes)

    function thisStyleIsForPhone(cls){
        if(cls.indexOf('tablet:') !== -1) return false
        if(cls.indexOf('pc:') !== -1) return false
        return true
    }

    let actualClasses = []
    let currentClass = 0
    for(let i=0; i<classes.length; i++){

        if(!actualClasses[currentClass]) actualClasses[currentClass] = ''

        actualClasses[currentClass] +=  classes[i]+' '

        if(classes[i+1]){
            if(classes[i+1].indexOf(':') !== -1) currentClass++
        }
    }
    
    console.log(classes,actualClasses)
    
    for(let cls of actualClasses){
        cls = cls.trim()
        console.log(cls)
        if(!cls) continue
        //only apply the style if style is for phone or the type matches
        if( thisStyleIsForPhone(cls) == true || cls.indexOf(type+'-') !== -1){

            if(cls.indexOf(type+'-') !== -1){
                cls = cls.replace(type+'-','')
                cls += '!important'
            }

            let claSplit = cls.split(':')

            //hyphen is used istead of colon because people might give space after hyphen and reading hyphen is easy
            
            let property = claSplit[0]
            let value = claSplit[1] 
            value = value.trim()
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

    }



    return style
}


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

    console.log(firstPart,secondPart)
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

