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
        if(coatAttribute) element.setAttribute('style', coat(coatAttribute) )
        
        if(!element.children) return

        for(let child of element.children){
            if(child.shadowRoot){
                observer.observe(child.shadowRoot, config)//even if a observer method is called twice on shdowRoot, it is handled by  MutationObserver
                return domUpdated(child.shadowRoot)
            }

            domUpdated(child)
        }
    }

    return

})

export function coat(classes){


    classes = classes.split(' ')

    let style = ''

    let type
   
    //mobile first media query implementation
    //phones style (the one that has no prefix) will be applied all the time
    
    type = screen.width > 1500? 'pc': 'tablet'
    if(screen.width < 812) type = 'phone'
    //the order is important

    //console.log(classes)
    
    for(let cls of classes){
        if(!cls) continue
        //only apply the style if no prefix exists or the type matches
        if( cls.split(':').length <= 2 || cls.indexOf(type+':') !== -1){

            if(cls.indexOf(type+':') !== -1){
                cls = cls.replace(type+':','')
                cls += '!important'
            } 
            let claSplit = cls.split(':')
            
            let property = claSplit[0]
            let value = claSplit[1]

           
            
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



function getInlineStyle(property,value){

    let possibleProperties = []
    //shorter string will have higher rank as shorter strings are used more freuently

    let specialProperties = {b:'background',c:'color',m:'margin'}
    
    if(specialProperties[property]){
        possibleProperties.push(specialProperties[property])
    }else{
        for(let key in template.style){
        
            if(key.substr(0,property.length).toLowerCase() == property.toLowerCase()  ) {
                possibleProperties.push(key)
            }
        }
    }


    possibleProperties.sort((a,b)=> a.length-b.length)

    if(!possibleProperties[0]) throw Error(`For property ${property} no mapping exist`)
    return `${JS_to_CSS_property(possibleProperties[0])}:${value};`
}

