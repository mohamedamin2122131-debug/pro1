# عمليات الملفات: فتح وحفظ
def open_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as file:
            return file.read()
    except Exception as e:
        return f"خطأ في فتح الملف: {e}"

def save_file(filepath, content):
    try:
        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(content)
        return "تم حفظ الملف بنجاح."
    except Exception as e:
        return f"خطأ في حفظ الملف: {e}"
