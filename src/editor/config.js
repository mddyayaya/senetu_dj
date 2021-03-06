import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)

/*富文本编辑图片上传配置*/
const uploadConfig = {
	action:"http://10.164.143.28/people/?c=d_three_api&m=uploadImg",// 必填参数 图片上传地址
	methods: 'POST',  // 必填参数 图片上传方式
	name:"file",
	size: 2048 ,  // 可选参数   图片大小，单位为Kb, 1M = 1024Kb
	accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'  // 可选 可上传的图片格式
};

// toolbar工具栏的工具选项（默认展示全部）
const toolOptions = [
	['bold', 'italic', 'underline'],
	[{'header': 1}, {'header': 2}],
	[{'list': 'ordered'}, {'list': 'bullet'}],
	[{'script': 'sub'}, {'script': 'super'}],
	[{'direction': 'rtl'}],
	[ 'image']
];
const handlers = {
    image: function image() {
        var self = this;
        var fileInput = this.container.querySelector('input.ql-image[type=file]');
        if (fileInput === null) {
            fileInput = document.createElement('input');
            fileInput.setAttribute('type', 'file');
            // 设置图片参数名
            if (uploadConfig.name) {
                fileInput.setAttribute('name', uploadConfig.name);
            }
            // 可设置上传图片的格式
            fileInput.setAttribute('accept', uploadConfig.accept);
            fileInput.classList.add('ql-image');
            // 监听选择文件
            fileInput.addEventListener('change', function () {
                // 创建formData
                var formData = new FormData();
                formData.append(uploadConfig.name, fileInput.files[0]);
                // 如果需要token且存在token
                if (uploadConfig.token) {
                    formData.append('token', uploadConfig.token)
                }
                // 图片上传
                var xhr = new XMLHttpRequest();
                xhr.open(uploadConfig.methods, uploadConfig.action, true);
                // 上传数据成功，会触发
                xhr.onload = function (e) {
                    if (xhr.status === 200) {
                        var res = JSON.parse(xhr.responseText);
                        let length = self.quill.getSelection(true).index;
                        //这里很重要，你图片上传成功后，img的src需要在这里添加，res.path就是你服务器返回的图片链接。      
							  console.log(res)
                        self.quill.insertEmbed(length, 'image', res.data.src);
                        self.quill.setSelection(length + 1)
                    }
                    fileInput.value = ''
                };
                // 开始上传数据
                xhr.upload.onloadstart = function (e) {
                    fileInput.value = ''
                };
                // 当发生网络异常的时候会触发，如果上传数据的过程还未结束
                xhr.upload.onerror = function (e) {
                };
                // 上传数据完成（成功或者失败）时会触发
                xhr.upload.onloadend = function (e) {
                    // console.log('上传结束')
                };
                xhr.send(formData)
            });
            this.container.appendChild(fileInput);
        }
        fileInput.click();
    }
};

export default {
    placeholder: '在此输入...',
    theme: 'snow',  // 主题
    modules: {
        toolbar: {
            container: toolOptions,  // 工具栏选项
            handlers: handlers  // 事件重写
        }
    }
};