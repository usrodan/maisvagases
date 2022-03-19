import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

html, body {  
} 

button{
  cursor: pointer;
  cursor: hand;
}  

input[type="text"], textarea, [contenteditable]{ 
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
} 
:-moz-any-link:focus {
  outline: none;
}
* {
	outline: none;
}

::placeholder {
  color: ${props => props.theme.colors.textAlternative};
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
 color: ${props => props.theme.colors.textAlternative};
}

::-ms-input-placeholder { /* Microsoft Edge */
 color: ${props => props.theme.colors.textAlternative};
}

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }



 body {
    //background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font: 400 16px "Open Sans", sans-serif;
  } 
  
  .block_container{ 
    
        max-width:1100px;
        display:flex;  
        flex:1;
        flex-wrap:wrap; 
    }

/* width */
*::-webkit-scrollbar {
  width: 10px;
}

/* Track */
*::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
*::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
*::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
 
`
