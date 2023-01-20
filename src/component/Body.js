import React, {useEffect, useReducer} from "react";
import post  from '../utilities/data.json'

export default function Body(){

    const defaultState = {
        post
    }

    const postReducer =(state,action)=>{
        switch(action.type){
            case "SUCCESS":
                return{
                    post:action.payload
                };
            case "FILTER":
                return{
                    ...state,post: state.post.filter((ft)=>{
                        return ft.status === action.tokenF
                    }
                    )
                };
            case "INCREASE":
                return{
                    ...state,
                    post:state.post.map((isc)=>
                        isc.id === action.token ? {...isc, score: isc.score + 1} : isc
                    )
                };
            case "DECREASE":
                return {
                    ...state,
                    post:state.post.map((isc)=>
                        isc.id === action.token ? {...isc, score: isc.score - 1} : isc
                    )
                };
            case "R_INCREASE":
                return{
                    ...state,post:state.post.map((pst)=>({
                        ...pst, answers: pst.answers.map((src)=>
                            src.id === action.tokena? {...src, score: src.score + 1}: src
                        )
                    }))
                    
                };
            case "R_DECREASE":
                return{
                    ...state,post:state.post.map((pst)=>({
                        ...pst, answers: pst.answers.map((src)=>
                            src.id === action.tokena? {...src, score: src.score - 1}: src
                        )
                    }))
                    };
                case "RQUESTION":
                    return{
                        ...state,post: state.post.filter((ft)=>{
                            return ft.id !== action.tokenr
                        }
                        )
                    };
                case "RANSWER":
                    return{
                        ...state,post: state.post.map((ft)=>({
                            ...ft,answers: ft.answers.filter((ar)=>{
                                return ar.id !== action.tokenar
                            }
                            )
                        })
                        )
                    };
            default:
                return state       
        }
    }

    let stateFilter = ()=>{
        let filter = document.querySelector('#fil')
        
        if(filter.value === "all")
            dispatch({type:"SUCCESS",payload:post})
        else
            dispatch({type:"FILTER", tokenF:filter.value})   
    }
    

    const [state,dispatch] = useReducer(postReducer, defaultState)
    const option =['all','active','deleted']
    const filter = ['recent', 'popular','hot']

    useEffect(()=>{
        dispatch({type:"SUCCESS",payload:post})
    },[])

   
      return(
        <>

            <select id='fil' name="filter">
                {option.map((opt,idx)=>{
                     return(
                        <option key={idx} id={idx} value={opt}>{opt}</option>
                    )}
                )}
            </select> 
                &nbsp;&nbsp;
            <select id='sort'>
                {filter.map((flt,id)=>{
                    return(
                        <option key={id} id={id} value={flt}>{flt}</option>
                        )
                    })}
            </select>
                <button onClick={stateFilter}>Search</button>

            &nbsp;&nbsp;

            {state.post.map((el)=>{
                return(

                    <div key={el.id} id={el.id}>
                        <h2>{el.question}</h2>
                        <span>{el.date}</span>
                        <div>
                            <button onClick={()=>{dispatch({type:"INCREASE",token:el.id})}}>+</button> <label>{el.score}</label> <button onClick={()=>{dispatch({type:"DECREASE",token:el.id})}}>-</button>
                        </div>
                            <button onClick={()=>dispatch({type:"RQUESTION",tokenr:el.id})}>Delete</button>
                        <hr/>
                        <p>{el.answers.length}</p>
                        
                        {el.answers.map((val)=>{       
                            return(
                                <div key={val.id} id={val.id}>
                                    <h3>{val.answer}</h3>
                                    <button onClick={()=>{dispatch({type:"R_INCREASE",tokena:val.id})}} >+</button> <label>{val.score}</label> <button onClick={()=>{dispatch({type:"R_DECREASE",tokena:val.id})}}>-</button>
                                    &nbsp;&nbsp; <button onClick={()=>{dispatch({type:"RANSWER",tokenar:val.id})}}>Delete</button>
                                    <br/>
                                    <br/>
                                </div>
                            )
                        })}

                        <ul>
                            {el.tags.map((tag,id)=>{
                                return(
                                    <li key={id}>{tag}</li>
                                )
                            })}
                        </ul>

                    </div>
                )
            })}
        </>
      )
}