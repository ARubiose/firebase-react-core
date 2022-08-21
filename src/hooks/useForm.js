import { useEffect, useMemo, useState } from 'react';

/**
 * 
 * @param {*} initialState 
 * @param {*} formValidations 
 * @returns 
 */
export const useForm = ( initialState = {}, formValidations = {}) => {
    
    const [formState, setFormState] = useState(initialState);
    const [formValidation, setFormValidation] = useState({})

    useEffect(() => {
      createValidators()
    }, [ formState ])

    useEffect(() => {  
        setFormState( initialState )  
    }, [initialState])
    
    
    const isFormValid = useMemo( () => {
        for( const formValue of Object.keys( formValidation )){
            if ( formValidation[formValue] !== null ) return false
        }
        return true
    }, [ formValidation ])

    // Reset form values
    const onResetForm = () => {
        setFormState( initialState );
    }

    // To be attached to onChange attribute of <input>
    const onInputChange = ({ target }) => {

        setFormState({
            ...formState,
            [ target.name ]: target.value
        });
    }
    
    // Create validators dynamically
    const createValidators = () => {
        const formCheckedValues = {};

        for( const formField of Object.keys( formValidations )){
            const [ fn, errorMessage ] = formValidations[formField];
            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;
        }

        setFormValidation( formCheckedValues )
    }

    return {
        ...formState, 
        formState, 
        onInputChange, 
        onResetForm,
        ...formValidation,
        isFormValid
    } ;

}