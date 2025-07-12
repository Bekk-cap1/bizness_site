import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    number: 0,
    page: '',
    catal: {},
    seter: {},
    raqam: {},
    korzinka: [],
    language: window.localStorage.getItem('language') || "ru"
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setNumber: (state, action)=>{
            state.number = action.payload
        },
        setPage: (state, action)=>{
            state.page = action.payload
        },
        setCatal: (state, action)=>{
            state.catal = action.payload
        },
        setSeter: (state,action) => {
            state.seter = action.payload
        },
        setRaqam: (state, action)=>{
            state.raqam = action.payload
        },
        setKorzinka: (state, action)=>{
            state.korzinka = action.payload
        },
        addToKorzinka: (state, action)=>{
            state.korzinka.push(action.payload)
        },
        setLanguage: (state, action)=>{
            state.language = action.payload
        },

    }
})

export const {
    setNumber,
    setPage,
    setCatal,
    setSeter,
    setRaqam,
    setKorzinka,
    addToKorzinka,
    setLanguage
} = appSlice.actions
export default appSlice.reducer