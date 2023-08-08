<template>
    <div class="login">
        <v-switch v-model="mode" hide-details true-value="light" false-value="dark" :label="`Switch: ${mode}`"></v-switch>
        <div class="login-content">
            <div style="width: 350px; margin: 0 auto">
                <h3 class="text-center mb-3">Welcome</h3>
                <v-form fast-fail @submit.prevent>
                    <v-text-field v-model="userName" :rules="userNameRules" label="username"></v-text-field>
                    <v-text-field v-model="email" :rules="emailRules" label="email"></v-text-field>
                   <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                        :rules="passwordRules" :type="show1 ? 'text' : 'password'"
                                        name="input-10-1" label="password" hint="At least 8 characters" counter
                                        @click:append="show1 = !show1"></v-text-field>
                    <v-btn :loading="loading" type="login" block class="mt-2" text="Register"></v-btn>
                </v-form>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'Register',
    data: () => ({
        mode: 'light',
        valid: false,
        userName: '',
        show1: false,
        userNameRules: [
            (v) => !!v || 'User name is required',
            (v) => v.length <= 10 || 'User name must be less than 10 characters',
        ],
        password: '',
        passwordRules: [
            (v) => !!v || 'Password is required',
            (v) => v.length >= 8 || 'Password must be more than 8 characters',
        ],
        email: '',
        emailRules: [
            (v) => !!v || 'Email is required',
            (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
    }),
};
</script>


<style scoped>
/* set the background imahe os login_background2 */
.login {
    background-image: url(../assets/tomei/tomei7.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: rgba(0, 0, 0, 0.3);
    height: 100vh;
}

/* fix the switch at the left top cornor */
.v-switch {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
}

/* make the login content be at the center of the screen using flex */
.login-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>
