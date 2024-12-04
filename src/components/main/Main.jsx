import { Row, Container } from "react-bootstrap";
import style from "./Main.module.css";
import { posts as originalPosts } from "../../posts.js";
import { PostCard } from "./PostCard.jsx";
import { useEffect, useState } from "react";

let basePost = { //creiamo una variabile statica che ci servira da base per gli inserimenti
  id: 0,
  title : '',
  image : '',
  content: '',
  tags: [],
  published: false,
}
let languageArray = {
  html:false,
  css:false,
  js:false,
  php:false
}
export default function Main() {
  const [formData, setFormData] = useState(basePost) //creiamo una varibile statica che ha come valore iniziale l'oggetto creato sopra
  const [posts, setPosts] = useState(originalPosts)
  const [status, setStatus] = useState(false)
  const [languageChecked, setLanguageChecked] = useState(languageArray)
  //funzione che mi aggiorna i valori del form data al cambio degli input
  function changeHandler(event){
    //creo una variabile per il valore da mettere nell'oggetto, se l'elemento che ha scatenato l'evento è  di tipo checkbox 
    //allora il valore andra a prendere il valore di checked altrimenti di value

    let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    /*if(event.target.type === 'checkbox'){
      
    }*/
    setFormData((formData)=>{ //passo una callback alla funzione set che ha come parametro la variabile reattiva
      return {...formData, //ritornera un oggetto copia di form data
        [event.target.name]:value} //ma che avra una key presa dal name dell elemento che ha scatenato l'evento con il rispettivo valore come value
    })
  }
  function changeTags(event){
    console.log(event.target.checked)
    console.log(event.target.id)
    setLanguageChecked((languageChecked)=>{ 
      return {...languageChecked, 
        [event.target.id]:event.target.checked} 
    })
   
  }
  function onSubmit(event){
    event.preventDefault();
    //controllo se i campi non sono vuoti
    if(formData.title === '' && formData.content === ''){
      console.log('vuoto uno dei due')
      return
    }
    
    let arr= [];
    for(let el in languageChecked){
      console.log(languageChecked[el])
      if(languageChecked[el]){
        arr.push(el)
      }
    }
    console.log(posts.length)
    //creo una variabile di appoggio dove andro a mettere i valori che ho preso dal form
    const newPost = {
      ...formData,//uso lo spread operator per mettere i valori di form data dentro al nuovo post
      id: posts.length + 1,
      tags: arr,
    }
  
    setPosts([...posts, newPost])//con set new arr vado a creare un array con i vecchi post piu quello nuovo
    setFormData(basePost)//riazzero i campi
    setStatus(false)
    setLanguageChecked(languageArray)
    arr = []
  }

  function deletePost(postToDelete){ //function per eliminare un post
    setPosts(posts.filter(post=>post!== postToDelete)) //prendo tutto tranne il post che corrisponde al post che ho passato alla funzione
  }

  function changeTitle(postToChange){ //funzione per cambiare il titolo dove passo l'elemento
    var newTitle = prompt("inserisci un nuovo titolo") //prompt per recuperare valore da mettere come titolo
    posts.map(post=>{ //creo un nuovo array dove se il post corrente corrisponde a quello passato cambio il titolo
      if(post === postToChange){     
          postToChange.title = newTitle
      }
    })
    setPosts([...posts]) //setto la variabile posts con il nuovo post
  }

  useEffect(() => {
    if(status){
      alert("Status aggiornato")
    }
  }, [status])


  return (
    <div className={[style.bgcolor_lightGrey, style.flex_grow_1].join(" ")}>
      <Container>
          <form className="row column-gap-3 row-gap-3" onSubmit ={onSubmit} action="">
            {/* vado a mettere nei campi di input la funzione da invocare al cambio dell'input e come valore il valore della variabile reattiva*/}
            <input onChange={(e)=>changeHandler(e)} type="text" className="col-2" name="title" value={formData.title} placeholder="inserisci titolo"></input> 
            <input onChange={(e)=>changeHandler(e)} type="text" className="col-2" name="content" value={formData.content} placeholder="inserisci testo"></input>
            <input onChange={(e)=>changeHandler(e)} type="text" className="col-2" name="image" value={formData.image} placeholder="inserisci url imagine"></input>
            <input onChange={(e)=>changeHandler(e)} type="text" className="col-2" name="tags" value={formData.tags} placeholder="inserisci tags"></input>
            <div className="col-2">
              <input onChange={(e)=>changeHandler(e)} checked={formData.published} name='published' id="published" type="checkbox"/>
              <label htmlFor="published">disponibile?</label>
            </div>
          <div className="row">
          <div className="col-1">
                <input onChange={changeTags} checked={languageArray.html} type="checkbox" name='tags'className="btn-check" id="html" autoComplete="off"/>
                <label className="btn btn-outline-primary" htmlFor="html">html</label>
            </div>
              <div className="col-1">
                  <input onChange={changeTags} checked={languageArray.css} type="checkbox" name='tags'className="btn-check" id="css" autoComplete="off"/>
                  <label className="btn btn-outline-primary" htmlFor="css">css</label>
              </div>
              <div className="col-1">
                  <input onChange={changeTags} checked={languageArray.js} type="checkbox" name='tags'className="btn-check" id="js" autoComplete="off"/>
                  <label className="btn btn-outline-primary" htmlFor="js">js</label>
              </div>
              <div className="col-1">
                  <input type="checkbox" onChange={changeTags} checked={languageArray.php} name='tags' id="php"className="btn-check" />
                  <label className="btn btn-outline-primary" htmlFor="php">php</label>
              </div>
            </div>  
            <input type="submit" className="col-1" onClick={()=>{setStatus(true)}}></input>
          </form>
        <Row
          className={[style.justify_center,style.align_center,style.padding_top_50,style.row_gap_15]}
        >
          {posts.map((el) => {
            return (
              el.published && (
                <PostCard
                  key={el.id}
                  id={el.id}
                  title={el.title}
                  image={el.image}
                  content={el.content}
                  tags={el.tags}
                  published={el.published}
                  callback = {()=>deletePost(el)}
                  callbackChangeTitle={()=>changeTitle(el)}
                />
              )
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
