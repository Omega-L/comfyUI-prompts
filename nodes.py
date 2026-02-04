import folder_paths
import nodes

class comfyUIPrompt:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                # 自定义小部件
                "prompt-widget": ("CUSTOM_PROMPT_COMPONENT", {}), 
            },
        }
        
    CATEGORY = "prompt-nodes"
    
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("prompt",)
    FUNCTION = "run"

    def run(self,  **kwargs):
        print(kwargs["prompt-widget"]["text"])

        output_text  = kwargs["prompt-widget"]["text"]
        return output_text,

NODE_CLASS_MAPPINGS = {
    "comfyUI-prompt": comfyUIPrompt
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "comfyUI-prompt": "comfyUI Prompt"
}