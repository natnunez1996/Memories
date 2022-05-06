import * as actionType from '../constants/actionTypes'
import * as api from '../api'

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData)

        dispatch({ type: actionType.AUTH, data })

        navigate('/', { replace: true })
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        //Sign Up user
        const { data } = await api.signUp(formData)

        dispatch({ type: actionType.AUTH, data })

        navigate('/', { replace: true })
    } catch (error) {
        console.log(error)
    }
}
