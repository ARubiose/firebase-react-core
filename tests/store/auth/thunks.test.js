// Testing thunks = testing dispatch functions are triggered
import { singInWithGoogle } from '../../../src/firebase/providers'
import { checkingCredentials, login, logout, startGoogleSignIn } from '../../../src/store/auth'
import {
    demoUser,
} from '../../fixtures/authFixtures'

jest.mock('../../../src/firebase/providers')

describe('Testing firebase thunks',  () => {
    const dispatch = jest.fn()
    beforeEach(() => jest.clearAllMocks())

    test('Google sign in - startGoogleSignIn - sucess', async () => {

        const loginData = { ok: true, ...demoUser}
        await singInWithGoogle.mockResolvedValue( loginData )

        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) )
    })

    test('Google sign in - startGoogleSignIn - error', async () => {

        const errorData = { ok: false, errorMessage:'Authentication error'}
        await singInWithGoogle.mockResolvedValue( errorData )

        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( logout( errorData ) )
    })
})
