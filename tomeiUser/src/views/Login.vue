<template>
    <div class="login">
        <!-- <v-switch v-model="mode" hide-details true-value="light" false-value="dark" :label="`Switch: ${mode}`"></v-switch> -->
        <div class="login-content">
            <v-container>
                <v-row class="mb-6" no-gutters>
                    <v-col cols="12" md="5" sm="6" class="ml-md-3 mr-md-auto ml-sm-3 mr-sm-auto">
                        <div style="width: 350px">
                            <h3 class="text-center mb-3">Welcome</h3>
                            <v-form @submit.prevent ref="loginForm" :rules="loginRules" name="input-10-0">
                                <v-text-field v-model="loginForm.username" :rules="loginRules.username"
                                    label="username"></v-text-field>
                                <v-text-field v-model="loginForm.password" :rules="loginRules.password"
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'"
                                    name="input-10-1" label="password" hint="At least 8 characters" counter
                                    @click:append="show1 = !show1"></v-text-field>
                                <div class="d-flex justify-space-between">
                                    <router-link to="/forgot" class="text-white">Forget your
                                        password?</router-link>
                                    <router-link to="/register" class="text-white">Sign up now</router-link>
                                </div>
                                <v-btn :loading="loading" type="submit" block color="grey-darken-4" class="my-2"
                                    text="Login" @click="handleLogin()"></v-btn>
                            </v-form>
                        </div>
                    </v-col>

                    <v-col cols="12" md="5" sm="6" class="ml-md-auto mr-md-3 ml-sm-auto mr-sm-3 ">
                        <div style="width: 350px">
                            <h3 class="text-center mb-3">Or, use third party login</h3>
                            <v-btn block color="blue-grey-lighten-2" @click="onSignIn()">Login with Google</v-btn>
                            <v-btn block color="grey-lighten-3" class="mt-3">Login with Facebook</v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
export default {
    name: 'Login',
    data: () => ({
        mode: 'light',
        valid: false,
        show1: false,
        loading: false,
        loginForm: {
            username: '',
            password: '',
        },
        loginRules: {
            username: [
                (v) => !!v || 'User name is required',
                (v) => v.length <= 20 || 'User name must be less than 10 characters',
            ],
            password: [
                (v) => !!v || 'Password is required',
                (v) => v.length >= 8 || 'Password must be more than 8 characters',
            ],
        },
        redirect: undefined
    }),
    watch: {
        $route: {
            handler: function (route) {
                this.redirect = route.query.redirect;
            },
            immedate: true
        }
    },
    methods: {
        handleLogin() {
            this.$refs.loginForm.validate().then(isValid => {
                if (isValid) {
                    this.loading = true;
                    console.log(this.loading);
                    this.$store.dispatch("Login", this.loginForm).then(() => {
                        // if the token exist
                        if (this.$store.state.user.token) {
                             this.$router.push({ path: this.redirect || '/' }).catch(err => { console.error(err) });
                        }

                    }).catch(() => {
                        console.log('store dispatch error')
                        this.loading = false;
                    });
                } else {
                    console.log("not validated");
                }
            }).catch(error => {
                console.error("Error during validation:", error);
                this.loading = false;
            });
        },
        // redirect to the backend to do the third party authentication
        onSignIn(googleUser) {
            location.href = 'http://192.168.169.215:8080/system/thirdLogin/sendRedirect';
        },
    },

};
</script>


<style scoped>
/* set the background imahe os login_background2 */
.login {
    background-image: url(../assets/tomei/tomei3.jpg);
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
