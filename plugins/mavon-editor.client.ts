import * as mavoneditor from 'mavon-editor';
import "mavon-editor/dist/css/index.css";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(mavoneditor);
})