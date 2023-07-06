import { client, clientWithoutAuth, clientFormData } from "..";
import { Signin, Signup, TokenI, UserI, UpdateUser, ResetPassword } from "@/interfaces/user";

class User {

    async _signin(payload: Signin): Promise<TokenI> {
        try {
            const uri = '/signin'
            const res = await clientWithoutAuth.post(uri, payload);

            return res.data;
        } catch (error) {
            throw error;
        }
    }

    async _signinWithToken(refreshToken: string): Promise<TokenI> {
        try {
            const uri = '/token/refresh'
            const res = await clientWithoutAuth.post(uri, { refresh_token: refreshToken });
            return res.data;
        } catch (error) {
            throw error;
        }
    }

    async _changePassword(payload: { password: string, newPassword: string }): Promise<void> {
        try {
            const uri = '/change_password'
            await client.post(uri, payload);
        } catch (error) {
            throw error;
        }
    }

    async _resetPassword(payload: ResetPassword): Promise<void> {
        try {
            const uri = '/reset_password';
            await client.post(uri, payload);
        } catch (error) {
            throw error;
        }
    }

    async passwordForgotten(payload: { email: string }) {
        try {
            const uri = '/password_forgotten';
            await clientWithoutAuth.post(uri, payload);
        } catch (error) {
            throw error;
        }
    }

    async _checkTokenValidity(payload: { token: string }) {
        try {
            const uri = `/check_token_validity/${payload.token}`;
            return clientWithoutAuth.get(uri);
        } catch (error) {
            throw error;
        }
    }

    async _signup(payload: Signup): Promise<TokenI> {
        try {
            const uri = '/signup'
            const res = await clientWithoutAuth.post(uri, payload);
            return res.data;
        } catch (error) {
            throw error;
        }
    }

    async _getSelfUser(): Promise<UserI> {
        try {
            const uri = '/me'
            const res = await client.get(uri);
            return res.data;
        } catch (error) {
            throw error;
        }
    }
 
    async _getSelfAllInfos(): Promise<UserI> {
        try {
            const uri = '/me-all-infos'
            const res = await client.get(uri);
            return res.data;
        } catch (error) {
            throw error;
        }
    }

    async _uploadAvatar(formData: FormData): Promise<String> {
        try {
            const uri = `me/${formData.get('id')}/avatar`;
            const res = await clientFormData.patch(uri, formData);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    async _getUsers(): Promise<UserI[]> {
        try {
            const uri = '/users'
            const res = await client.get(uri);
            return res.data;
        } catch (error) {
            throw error;
        }
    }
    
    async _getUserById(userId: string): Promise<UserI> {
        try {
            const uri = '/user/' + userId;
            const res = await client.get(uri);
            return res.data;
        } catch (error) {
            throw error;
        }
    }


    async _updateUser(payload: UpdateUser): Promise<UserI> {
        try {
            const uri = `/user/${payload.id}`;
            const res = await client.patch(uri, payload);
            return res.data;
        } catch (error) {
            throw error;
        }
    }
}

const userService = new User();

export default userService;
