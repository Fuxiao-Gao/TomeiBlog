<template>
    <div class="login">
        <v-switch v-model="mode" hide-details true-value="light" false-value="dark" :label="`Switch: ${mode}`"></v-switch>
        <div class="login-content">
            <div style="width: 350px; margin: 0 auto">
                <h3 class="text-center mb-3">we will send a password reset token to your email</h3>
                <v-form fast-fail @submit.prevent>
                    <v-text-field v-model="email" :rules="emailRules" label="email"></v-text-field>
                    <v-btn :loading="loading" type="login" block class="mt-2" text="send"></v-btn>
                </v-form>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'Login',
    data: () => ({
        mode: 'light',
        valid: false,
        userName: '',
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


<style setup>
/* set the background imahe os login_background2 */
.login {
    background-image: url(../assets/tomei/tomei6.jpg);
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
