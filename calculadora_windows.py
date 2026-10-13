import tkinter as tk
from tkinter import font
import math

class WindowsCalculator(tk.Tk):
    def __init__(self):
        super().__init__()

        self.title("Calculadora de Víctor")
        self.geometry("340x500")
        self.minsize(320, 460)
        
        # Color palette (Windows 11 Calculator Dark/Modern Theme)
        self.bg_color = "#202020"          # Dark mica/acrylic feel
        self.display_bg = "#202020"
        self.btn_num_bg = "#3b3b3b"        # Number buttons
        self.btn_num_hover = "#323232"
        self.btn_op_bg = "#323232"         # Operator / function buttons
        self.btn_op_hover = "#3f3f3f"
        self.btn_equal_bg = "#4cc2ff"      # Windows accent cyan/blue
        self.btn_equal_hover = "#40b0e8"
        self.text_color = "#ffffff"
        self.subtext_color = "#a0a0a0"
        self.equal_text_color = "#000000"

        self.configure(bg=self.bg_color)

        # State variables
        self.current_input = "0"
        self.stored_value = None
        self.pending_op = None
        self.reset_on_next_input = False
        self.expression_text = ""

        # UI Setup
        self._setup_fonts()
        self._build_display()
        self._build_keypad()
        self._bind_keys()

    def _setup_fonts(self):
        self.font_expr = font.Font(family="Segoe UI Variable Text", size=11)
        self.font_main = font.Font(family="Segoe UI Variable Display", size=32, weight="bold")
        self.font_buttons = font.Font(family="Segoe UI Variable Text", size=12)
        self.font_num_buttons = font.Font(family="Segoe UI Variable Text", size=13, weight="bold")

    def _build_display(self):
        display_frame = tk.Frame(self, bg=self.display_bg, padx=16, pady=4)
        display_frame.pack(fill="x", expand=False)

        # Small top expression label (e.g. "5 + 3 =")
        self.lbl_expr = tk.Label(
            display_frame,
            text="",
            font=self.font_expr,
            fg=self.subtext_color,
            bg=self.display_bg,
            anchor="e"
        )
        self.lbl_expr.pack(fill="x", pady=(0, 4))

        # Main number display
        self.lbl_main = tk.Label(
            display_frame,
            text="0",
            font=self.font_main,
            fg=self.text_color,
            bg=self.display_bg,
            anchor="e"
        )
        self.lbl_main.pack(fill="x", pady=(0, 8))

    def _build_keypad(self):
        keypad_frame = tk.Frame(self, bg=self.bg_color, padx=6, pady=6)
        keypad_frame.pack(fill="both", expand=True)

        for r in range(6):
            keypad_frame.rowconfigure(r, weight=1)
        for c in range(4):
            keypad_frame.columnconfigure(c, weight=1)

        # Button layout definition: (label, row, col, type, command)
        buttons = [
            ("%", 0, 0, "op", self.btn_percent),
            ("CE", 0, 1, "op", self.btn_clear_entry),
            ("C", 0, 2, "op", self.btn_clear_all),
            ("⌫", 0, 3, "op", self.btn_backspace),

            ("1/x", 1, 0, "op", self.btn_reciprocal),
            ("x²", 1, 1, "op", self.btn_square),
            ("√x", 1, 2, "op", self.btn_sqrt),
            ("÷", 1, 3, "op", lambda: self.btn_operator("÷")),

            ("7", 2, 0, "num", lambda: self.btn_digit("7")),
            ("8", 2, 1, "num", lambda: self.btn_digit("8")),
            ("9", 2, 2, "num", lambda: self.btn_digit("9")),
            ("×", 2, 3, "op", lambda: self.btn_operator("×")),

            ("4", 3, 0, "num", lambda: self.btn_digit("4")),
            ("5", 3, 1, "num", lambda: self.btn_digit("5")),
            ("6", 3, 2, "num", lambda: self.btn_digit("6")),
            ("-", 3, 3, "op", lambda: self.btn_operator("-")),

            ("1", 4, 0, "num", lambda: self.btn_digit("1")),
            ("2", 4, 1, "num", lambda: self.btn_digit("2")),
            ("3", 4, 2, "num", lambda: self.btn_digit("3")),
            ("+", 4, 3, "op", lambda: self.btn_operator("+")),

            ("±", 5, 0, "num", self.btn_negate),
            ("0", 5, 1, "num", lambda: self.btn_digit("0")),
            (",", 5, 2, "num", self.btn_comma),
            ("=", 5, 3, "equal", self.btn_equal),
        ]

        for text, r, c, btype, cmd in buttons:
            if btype == "num":
                bg = self.btn_num_bg
                fg = self.text_color
                fnt = self.font_num_buttons
                hover = self.btn_num_hover
            elif btype == "equal":
                bg = self.btn_equal_bg
                fg = self.equal_text_color
                fnt = self.font_num_buttons
                hover = self.btn_equal_hover
            else:
                bg = self.btn_op_bg
                fg = self.text_color
                fnt = self.font_buttons
                hover = self.btn_op_hover

            btn = tk.Button(
                keypad_frame,
                text=text,
                font=fnt,
                bg=bg,
                fg=fg,
                activebackground=hover,
                activeforeground=fg,
                relief="flat",
                bd=0,
                command=cmd,
                cursor="hand2"
            )
            btn.grid(row=r, column=c, padx=2, pady=2, sticky="nsew")

            # Mouse hover effect
            btn.bind("<Enter>", lambda e, b=btn, h=hover: b.config(bg=h))
            btn.bind("<Leave>", lambda e, b=btn, orig=bg: b.config(bg=orig))

    def _bind_keys(self):
        for digit in "0123456789":
            self.bind(digit, lambda e, d=digit: self.btn_digit(d))
        self.bind("+", lambda e: self.btn_operator("+"))
        self.bind("-", lambda e: self.btn_operator("-"))
        self.bind("*", lambda e: self.btn_operator("×"))
        self.bind("/", lambda e: self.btn_operator("÷"))
        self.bind("<Return>", lambda e: self.btn_equal())
        self.bind("<KP_Enter>", lambda e: self.btn_equal())
        self.bind("<BackSpace>", lambda e: self.btn_backspace())
        self.bind("<Escape>", lambda e: self.btn_clear_all())
        self.bind(".", lambda e: self.btn_comma())
        self.bind(",", lambda e: self.btn_comma())

    # --- Calculation & Logic ---

    def _format_number(self, val):
        """Format number removing ugly trailing zeroes or returning scientific notation if needed."""
        try:
            num = float(val)
            if math.isnan(num) or math.isinf(num):
                return "Error"
            if num.is_integer() and abs(num) < 1e12:
                return str(int(num))
            formatted = f"{num:.10g}"
            return formatted
        except Exception:
            return "Error"

    def _update_display(self):
        # Truncate text size visually if string is very long
        text = self.current_input
        if len(text) > 13:
            self.lbl_main.config(font=("Segoe UI Variable Display", 22, "bold"))
        elif len(text) > 9:
            self.lbl_main.config(font=("Segoe UI Variable Display", 26, "bold"))
        else:
            self.lbl_main.config(font=self.font_main)

        self.lbl_main.config(text=text)
        self.lbl_expr.config(text=self.expression_text)

    def btn_digit(self, digit):
        if self.reset_on_next_input:
            self.current_input = digit
            self.reset_on_next_input = False
        else:
            if self.current_input == "0":
                self.current_input = digit
            else:
                if len(self.current_input.replace("-", "").replace(".", "")) < 16:
                    self.current_input += digit
        self._update_display()

    def btn_comma(self):
        if self.reset_on_next_input:
            self.current_input = "0."
            self.reset_on_next_input = False
        elif "." not in self.current_input:
            self.current_input += "."
        self._update_display()

    def btn_negate(self):
        if self.current_input != "0" and self.current_input != "Error":
            if self.current_input.startswith("-"):
                self.current_input = self.current_input[1:]
            else:
                self.current_input = "-" + self.current_input
            self._update_display()

    def btn_backspace(self):
        if self.reset_on_next_input:
            return
        if len(self.current_input) > 1:
            self.current_input = self.current_input[:-1]
            if self.current_input == "-":
                self.current_input = "0"
        else:
            self.current_input = "0"
        self._update_display()

    def btn_clear_entry(self):
        self.current_input = "0"
        self._update_display()

    def btn_clear_all(self):
        self.current_input = "0"
        self.stored_value = None
        self.pending_op = None
        self.expression_text = ""
        self.reset_on_next_input = False
        self._update_display()

    def _execute_op(self, a, op, b):
        if op == "+":
            return a + b
        elif op == "-":
            return a - b
        elif op == "×":
            return a * b
        elif op == "÷":
            if b == 0:
                return "Error"
            return a / b
        return b

    def btn_operator(self, op):
        try:
            val = float(self.current_input)
        except ValueError:
            return

        if self.stored_value is not None and not self.reset_on_next_input:
            res = self._execute_op(self.stored_value, self.pending_op, val)
            if res == "Error":
                self.current_input = "No se puede dividir entre cero"
                self.stored_value = None
                self.pending_op = None
                self.expression_text = ""
                self.reset_on_next_input = True
                self._update_display()
                return
            self.stored_value = res
            self.current_input = self._format_number(res)
        else:
            self.stored_value = val

        self.pending_op = op
        self.expression_text = f"{self._format_number(self.stored_value)} {op}"
        self.reset_on_next_input = True
        self._update_display()

    def btn_equal(self):
        if self.pending_op is None or self.stored_value is None:
            return

        try:
            val = float(self.current_input)
        except ValueError:
            return

        res = self._execute_op(self.stored_value, self.pending_op, val)
        if res == "Error":
            self.expression_text = f"{self._format_number(self.stored_value)} {self.pending_op} {self._format_number(val)} ="
            self.current_input = "No se puede dividir entre cero"
        else:
            self.expression_text = f"{self._format_number(self.stored_value)} {self.pending_op} {self._format_number(val)} ="
            self.current_input = self._format_number(res)

        self.stored_value = None
        self.pending_op = None
        self.reset_on_next_input = True
        self._update_display()

    # --- Extra functions (1/x, x², √x, %) ---

    def btn_percent(self):
        try:
            val = float(self.current_input)
            if self.stored_value is not None:
                # Percentage of base value
                val = (self.stored_value * val) / 100.0
            else:
                val = 0
            self.current_input = self._format_number(val)
            self._update_display()
        except Exception:
            pass

    def btn_reciprocal(self):
        try:
            val = float(self.current_input)
            if val == 0:
                self.current_input = "No se puede dividir entre cero"
            else:
                res = 1 / val
                self.expression_text = f"1/({self._format_number(val)})"
                self.current_input = self._format_number(res)
            self.reset_on_next_input = True
            self._update_display()
        except Exception:
            pass

    def btn_square(self):
        try:
            val = float(self.current_input)
            res = val ** 2
            self.expression_text = f"sqr({self._format_number(val)})"
            self.current_input = self._format_number(res)
            self.reset_on_next_input = True
            self._update_display()
        except Exception:
            pass

    def btn_sqrt(self):
        try:
            val = float(self.current_input)
            if val < 0:
                self.current_input = "Entrada no válida"
            else:
                res = math.sqrt(val)
                self.expression_text = f"√({self._format_number(val)})"
                self.current_input = self._format_number(res)
            self.reset_on_next_input = True
            self._update_display()
        except Exception:
            pass


if __name__ == "__main__":
    app = WindowsCalculator()
    app.mainloop()

