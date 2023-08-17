<template>
    <div class="login">
        <div class="login-content">
            <div style="width: 350px; margin: 0 auto">
                <h3 class="text-center mb-3">Welcome</h3>
                <v-form ref="registerForm" :rules="registerRules" fast-fail @submit.prevent>
                    <v-text-field v-model="registerForm.username" :rules="registerRules.username"
                        label="username"></v-text-field>
                    <v-text-field v-model="registerForm.email" :rules="registerRules.email" label="email"></v-text-field>
                    <v-text-field v-model="registerForm.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="passwordRules" :type="show1 ? 'text' : 'password'" name="input-10-1" label="password"
                        hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>

                    <!-- File input -->
                    <v-file-input label="Upload Image" prepend-icon="mdi-camera" @change="onFileChange($event)"
                        v-model="file"></v-file-input>

                    <!-- Image preview -->
                    <v-img v-if="imageUrl" :src="imageUrl" max-height="200" class="mb-2"></v-img>
                    <!-- this listens for a change event on the file input, which is triggered when a user selects a file -->
                    <v-btn :loading="loading" type="login" block class="mt-2" text="Register"
                        @click="handleRegister()"></v-btn>
                </v-form>
            </div>
        </div>
    </div>
</template>


<script>
import { getUsers, addUsers, getUserByName } from '../api/users';
import { uploadImg } from '../api/upload';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
export default {
    name: 'Register',
    data: () => ({
        valid: false,
        userName: '',
        file: null,
        show1: false,
        loading: false,
        formData: null,
        imageUrl: null,
        registerForm: {
            username: null,
            password: null,
            profilePic: null,
            email: null,
        },
        registerRules: {
            username: [
                (v) => !!v || 'User name is required',
                (v) => v.length <= 20 || 'User name must be less than 10 characters',
            ],
            password: [
                (v) => !!v || 'Password is required',
                (v) => v.length >= 8 || 'Password must be more than 8 characters',
            ],
            email: [
                (v) => !!v || 'Email is required',
                (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
        },
    }),
    methods: {
        handleRegister() {
            this.$refs.registerForm.validate().then(isValid => {
                if (isValid.valid) {
                    //see whether the user name is already exist
                    getUserByName(this.registerForm.username).then(res => {
                        if (res.data) {
                            Swal.fire({
                                icon: 'error',
                                text: 'User name already exist!',
                            })
                        } else {
                            // get the profile picture image
                            uploadImg(this.formData).then(res => {
                            
                               this.registerForm.profilePic = res.url.replace(process.env.BASE_API, '');
                                // add the user
                                addUsers(this.registerForm).then(res => {
                                    Swal.fire({
                                        icon: 'success',
                                        text: 'Register successfully!',
                                    })
                                    this.$router.push({ path: '/login' }).catch(err => { console.error(err) });
                                }).catch(err => {
                                    console.log("error during adding user", err)
                                    Swal.fire({
                                        icon: 'error',
                                        text: 'Register failed!',
                                    })
                                })
                            }).catch(err => {
                                console.log("error during uploading image", err)
                            })
                        }
                    }).catch(err => {
                        console.log("error during fetching user", err)
                        Swal.fire({
                            icon: 'error',
                            text: 'Register failed',
                        })
                    })
                } else {
                    console.log("not validated");
                }
            })
        },
        onFileChange(event) {
            console.log(this.file)
            this.formData = new window.FormData();
            this.formData.append('file', this.file[0]);

            const input = event.target;
            if (input.files && input.files[0]) {
                this.file = input.files[0];

                const reader = new FileReader();
                reader.readAsDataURL(this.file);
                reader.onload = (e) => {
                    this.imageUrl = e.target.result;
                };
                reader.onerror = (error) => {
                    console.error('Error reading file:', error);
                };
            }
        }

    }
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
