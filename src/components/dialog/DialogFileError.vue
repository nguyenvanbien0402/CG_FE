<template>
  <v-dialog v-model="dialog"
            scrollable
            width="400"
            @click:outside="close"
            @keydown.esc="close"
  >
    <v-card class="rounded-lg">
      <v-toolbar dark
                 color="info"
                 :title="$t('dialogName.fileUploadError')"
      >
        <v-spacer />
        <v-btn icon="mdi-close"
               @click="close"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card
        flat
        class="py-1 px-7 rounded-0 overflow-y-scroll mt-3"
        style="height: calc(100% - 48px);"
      >
        <div class="col-12 row m-0 p-0">
          <div>
            <p>File upload error, click link to download file error details:</p>
          </div>
          <div>
            <a
              class="hover:bg-gray-200"
              :href="linkFileError"
              style="overflow: hidden; text-overflow: ellipsis; color: blue;"
              target="_blank"
            >{{ fileError }}</a>
          </div>
        </div>

        <v-card-actions
          class="flex-row-reverse mt-3"
        >
          <v-btn
            color="info"
            class="text-sm mb-2"
            variant="outlined"
            @click="close"
          >
            {{ $t('btn.cancel') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'

// Initial
const dialog = ref(false)
const linkFileError = ref(null)
const fileError = ref('')

// Function
const open = (fileName) => {
  linkFileError.value = `${import.meta.env.VITE_BASE_URL}` + '/cg/api/File/error/' + fileName
  fileError.value = fileName
  return (dialog.value = true)
}

const close = () => {
  return (dialog.value = false)
}

defineExpose({
  open
})
</script>
