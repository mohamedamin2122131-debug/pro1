import tkinter as tk

class Calculator:
    def __init__(self, root):
        self.root = root
        self.root.title("آلة حاسبة متكاملة")
        self.root.geometry("400x500")
        self.root.resizable(False, False)

        self.expression = ""

        # شاشة العرض
        self.input_text = tk.StringVar()
        self.input_text.set("0")

        input_frame = tk.Frame(self.root, bd=2, relief=tk.RIDGE, bg="#eeeeee")
        input_frame.pack(side=tk.TOP, fill=tk.BOTH)

        self.input_field = tk.Entry(
            input_frame,
            font=('Arial', 24),
            textvariable=self.input_text,
            justify='right',
            bd=10,
            bg="#ffffff",
            relief=tk.FLAT
        )
        self.input_field.pack(fill=tk.BOTH, ipadx=8, ipady=25, padx=10, pady=10)

        # الأزرار
        self.create_buttons()

    def create_buttons(self):
        btns_frame = tk.Frame(self.root, bg="#d9d9d9")
        btns_frame.pack(expand=True, fill="both")

        buttons = [
            ["C", "⌫", "/", "*"],
            ["7", "8", "9", "-"],
            ["4", "5", "6", "+"],
            ["1", "2", "3", "="],
            ["0", ".", "", ""]
        ]

        for row_index, row in enumerate(buttons):
            for col_index, btn_text in enumerate(row):
                if btn_text == "":
                    continue
                button = tk.Button(
                    btns_frame,
                    text=btn_text,
                    font=('Arial', 20),
                    bd=1,
                    relief=tk.RIDGE,
                    command=lambda x=btn_text: self.on_button_click(x),
                    bg="#ffffff" if btn_text not in ["=", "C", "⌫"] else "#f2a33c",
                    fg="#000000" if btn_text not in ["=", "C", "⌫"] else "#ffffff"
                )
                button.grid(row=row_index, column=col_index, sticky="nsew", padx=1, pady=1)

        # توزيع الحجم بالتساوي
        for i in range(5):
            btns_frame.rowconfigure(i, weight=1)
        for i in range(4):
            btns_frame.columnconfigure(i, weight=1)

    def on_button_click(self, char):
        if char == "C":
            self.expression = ""
            self.input_text.set("0")
        elif char == "⌫":
            self.expression = self.expression[:-1]
            self.input_text.set(self.expression if self.expression else "0")
        elif char == "=":
            try:
                result = str(eval(self.expression))
                self.input_text.set(result)
                self.expression = result
            except:
                self.input_text.set("خطأ")
                self.expression = ""
        else:
            if self.input_text.get() == "0" or self.input_text.get() == "خطأ":
                self.expression = ""
            self.expression += char
            self.input_text.set(self.expression)

if __name__ == "__main__":
    root = tk.Tk()
    calc = Calculator(root)
    root.mainloop()
