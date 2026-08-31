import { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'

export const beforeUpload = (file: any) => {
  // 针对上传的文件进行校验
  console.log(file)
  const isImage = file.type.startsWith('image/')
  const isLt5M = file.size / 1014 / 1014 < 5
  if (!isImage) {
    ElMessage.error('上传封面图片，请选择图片文件')
    return false
  }
  if (!isLt5M) {
    ElMessage.error('上传封面图片，图片大小不能超过5MB')
    return false
  }
  return true
}
