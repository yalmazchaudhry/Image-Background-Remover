<template>
  <v-container>
    <v-row class="text-center">
      <v-col  cols="12">
        <h1>Upload an image to remove the background</h1>
      </v-col>
      <v-row>
        <v-col class="col-md-4" v-show="showComponent">
          <v-img
          contain
          :src="previewImage !=='' ? previewImage : `https://img.freepik.com/free-photo/dreamy-young-woman-sunglasses-looking-front_197531-16739.jpg?w=2000`"
          width="400px"
          ></v-img>
        </v-col>
      <v-col  class=" mb-4 col-md-4 ">
      <v-card>
        <v-icon color="grey lighten-1" class="my-4" size="75">mdi-upload</v-icon>
        <br>
        
        <!-- ref="uploader" -->
        <input id="imgInput" ref="uploader" type="file"  accept="image/jpeg, image/png, image/jpg" @change="uploadImage" hidden>
        <v-btn
        class="mb-2"
      rounded
      color="primary"
      dark
      x-large
      @click="chooseFiles()"
    >
   
    <v-icon>mdi-upload</v-icon>
      Upload
    </v-btn>
    <p class="grey--text pb-5">or drop a file</p>
      </v-card>  
      <span><p>{{ this.fileName }}</p></span>
    </v-col>
    <v-col class="col-md-4" v-show="showComponent">
      <v-img
      :src=getRemovedBg
          width="400px"
          
          contain
          ></v-img>
          <v-btn
        class="mt-2"
      rounded
      color="primary"
      dark
      large
      @click="convertImage(previewImage)"
    >
    <v-icon>mdi-autorenew</v-icon>
      Convert
    </v-btn>
    <a download="img.jpg" :href= "getRemovedBg" v-show="downloadBtn"><v-btn
        class="ml-2 mt-2"
        @click="showComponent=false"
      rounded
      color="primary"
      dark
      large

    >
    <v-icon>mdi-download</v-icon>
      Download
    </v-btn></a>
    </v-col>
  </v-row>

        
        
    </v-row>
  </v-container>
</template>

<script>
import { store } from '@/store'
  export default {
    name: 'MainPage',
    data(){
      return{
        previewImage:'',
        showComponent: false,
        downloadBtn:false,
        fileName:'',
    } 
    },
    computed: {
      getRemovedBg(){
console.log(store.state.Image,"gjhdgjgj")
        return store.state.Image
      },
    },
    methods: {
      chooseFiles(){
        this.$refs.uploader.click();
      // document.getElementById("imgInput").click();
    },
    uploadImage(e){
                const image = e.target.files[0];
                const reader = new FileReader();
                this.fileName=image.name
                reader.readAsDataURL(image);
                reader.onload = e =>{
                    this.previewImage = e.target.result;
                    this.showComponent=true
                };
            },
            convertImage(Image){
                    // console.log(Image);
                    store.dispatch("getImage", Image)
                    this.downloadBtn=true
            },
           
            
        }



    
}
  
</script>
