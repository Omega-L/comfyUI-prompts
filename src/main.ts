// @ts-ignore - ComfyUI external module
import { app } from '../../../scripts/app.js'
import { createApp, type App as VueApp } from 'vue'
import { createI18n } from 'vue-i18n'
import PrimeVue from 'primevue/config'
import PromptWidget from '@/components/PromptWidget.vue'

import { addStylesheet, getUrl } from './util/index.ts'
import en from '../locales/en/main.json'
import zh from '../locales/zh/main.json'
import '@/assets/main.css'

const vueApps = new Map<number, VueApp>()

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, zh }
})

// @ts-ignore
function createVueWidget(node) {
  const container = document.createElement('div')
  container.id = `vue-basic-widget-${node.id}`
  container.style.width = '100%'
  container.style.height = '100%'
  container.style.minHeight = '400px'
  container.style.display = 'flex'
  container.style.flexDirection = 'column'
  container.style.overflow = 'hidden'

  const widget = node.addDOMWidget(
    'prompt-widget',
    'prompt-widget',
    container,
    {
      getMinHeight: () => 420,
      hideOnZoom: false,
      serialize: true
    }
  )

  const vueApp = createApp(PromptWidget, {
    widget,
    node
  })

  vueApp.use(i18n)
  vueApp.use(PrimeVue, {
    unstyled: true,
    locale: 'en',
  });

  vueApp.mount(container)
  vueApps.set(node.id, vueApp)

  widget.onRemove = () => {
    const vueApp = vueApps.get(node.id)
    if (vueApp) {
      vueApp.unmount()
      vueApps.delete(node.id)
    }
  }

  return { widget }
}

app.registerExtension({
  name: 'prompt-node',
  settings: [
    {
      id: 'Comfy.Prompt.Setting',
      category: ['Prompt'],
      name: 'ComfyUI Prompt Setting',
      tooltip: '',
      type: 'boolean',
      defaultValue: true,
      experimental: true
    }
  ],
  setup() {
    // 注册样式
    addStylesheet(getUrl("css/main.css", import.meta.url));
  },
  getCustomWidgets() {
    return {
      // @ts-ignore
      CUSTOM_PROMPT_COMPONENT(node) {
        return createVueWidget(node)
      }
    }
  },
  // @ts-ignore
  nodeCreated(node) {
    if (node.constructor?.comfyClass !== 'comfyUI-prompt') return
    const [oldWidth, oldHeight] = node.size
    node.setSize([Math.max(oldWidth, 300), Math.max(oldHeight, 520)])
  }
})
