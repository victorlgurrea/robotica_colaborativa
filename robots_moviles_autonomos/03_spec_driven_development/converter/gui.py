"""
Interfaz gráfica del conversor de longitudes.
Estilo Windows 11 (misma línea visual que la calculadora del curso).
"""

from __future__ import annotations

import tkinter as tk
from tkinter import font

from .core import ConversionError, convert

UNITS = ("mm", "cm", "m")


class LengthConverterApp(tk.Tk):
    def __init__(self) -> None:
        super().__init__()

        self.title("Conversor de longitudes")
        self.geometry("340x560")
        self.minsize(320, 520)
        self.resizable(False, False)

        # Misma paleta que 01_calculadora_interfaz
        self.bg_color = "#202020"
        self.display_bg = "#202020"
        self.btn_num_bg = "#3b3b3b"
        self.btn_num_hover = "#323232"
        self.btn_op_bg = "#323232"
        self.btn_op_hover = "#3f3f3f"
        self.btn_equal_bg = "#4cc2ff"
        self.btn_equal_hover = "#40b0e8"
        self.btn_unit_on = "#4cc2ff"
        self.btn_unit_off = "#323232"
        self.text_color = "#ffffff"
        self.subtext_color = "#a0a0a0"
        self.equal_text_color = "#000000"

        self.configure(bg=self.bg_color)

        self.current_input = "0"
        self.reset_on_next_input = False
        self.from_unit = "m"
        self.to_unit = "cm"
        self.expression_text = ""

        self._from_btns: dict[str, tk.Button] = {}
        self._to_btns: dict[str, tk.Button] = {}

        self._setup_fonts()
        self._build_display()
        self._build_unit_bars()
        self._build_keypad()
        self._bind_keys()
        self._refresh_unit_buttons()
        self._update_display()

    def _setup_fonts(self) -> None:
        self.font_expr = font.Font(family="Segoe UI Variable Text", size=11)
        self.font_main = font.Font(family="Segoe UI Variable Display", size=32, weight="bold")
        self.font_buttons = font.Font(family="Segoe UI Variable Text", size=12)
        self.font_num_buttons = font.Font(family="Segoe UI Variable Text", size=13, weight="bold")
        self.font_section = font.Font(family="Segoe UI Variable Text", size=9)
        self.font_unit = font.Font(family="Segoe UI Variable Text", size=11, weight="bold")

    def _build_display(self) -> None:
        display_frame = tk.Frame(self, bg=self.display_bg, padx=16, pady=4)
        display_frame.pack(fill="x", expand=False)

        self.lbl_expr = tk.Label(
            display_frame,
            text="",
            font=self.font_expr,
            fg=self.subtext_color,
            bg=self.display_bg,
            anchor="e",
        )
        self.lbl_expr.pack(fill="x", pady=(8, 4))

        self.lbl_main = tk.Label(
            display_frame,
            text="0",
            font=self.font_main,
            fg=self.text_color,
            bg=self.display_bg,
            anchor="e",
        )
        self.lbl_main.pack(fill="x", pady=(0, 8))

    def _build_unit_bars(self) -> None:
        wrap = tk.Frame(self, bg=self.bg_color, padx=8, pady=4)
        wrap.pack(fill="x")

        tk.Label(
            wrap,
            text="ORIGEN",
            font=self.font_section,
            fg=self.subtext_color,
            bg=self.bg_color,
            anchor="w",
        ).pack(fill="x", padx=4)

        from_row = tk.Frame(wrap, bg=self.bg_color)
        from_row.pack(fill="x", pady=(2, 8))
        for i in range(3):
            from_row.columnconfigure(i, weight=1)
        for i, unit in enumerate(UNITS):
            btn = self._make_button(
                from_row,
                unit,
                self.font_unit,
                self.btn_unit_off,
                self.text_color,
                self.btn_op_hover,
                lambda u=unit: self._set_from_unit(u),
                track_unit=("from", unit),
            )
            btn.grid(row=0, column=i, padx=2, pady=2, sticky="nsew", ipady=6)
            self._from_btns[unit] = btn

        tk.Label(
            wrap,
            text="DESTINO",
            font=self.font_section,
            fg=self.subtext_color,
            bg=self.bg_color,
            anchor="w",
        ).pack(fill="x", padx=4)

        to_row = tk.Frame(wrap, bg=self.bg_color)
        to_row.pack(fill="x", pady=(2, 4))
        for i in range(3):
            to_row.columnconfigure(i, weight=1)
        for i, unit in enumerate(UNITS):
            btn = self._make_button(
                to_row,
                unit,
                self.font_unit,
                self.btn_unit_off,
                self.text_color,
                self.btn_op_hover,
                lambda u=unit: self._set_to_unit(u),
                track_unit=("to", unit),
            )
            btn.grid(row=0, column=i, padx=2, pady=2, sticky="nsew", ipady=6)
            self._to_btns[unit] = btn

    def _build_keypad(self) -> None:
        keypad = tk.Frame(self, bg=self.bg_color, padx=6, pady=6)
        keypad.pack(fill="both", expand=True)

        for r in range(5):
            keypad.rowconfigure(r, weight=1)
        for c in range(4):
            keypad.columnconfigure(c, weight=1)

        # Misma rejilla tipo Calculadora Windows
        buttons = [
            ("CE", 0, 0, "op", self.btn_clear_entry),
            ("C", 0, 1, "op", self.btn_clear_all),
            ("⌫", 0, 2, "op", self.btn_backspace),
            ("⇄", 0, 3, "op", self.btn_swap_units),
            ("7", 1, 0, "num", lambda: self.btn_digit("7")),
            ("8", 1, 1, "num", lambda: self.btn_digit("8")),
            ("9", 1, 2, "num", lambda: self.btn_digit("9")),
            ("", 1, 3, "op", None),
            ("4", 2, 0, "num", lambda: self.btn_digit("4")),
            ("5", 2, 1, "num", lambda: self.btn_digit("5")),
            ("6", 2, 2, "num", lambda: self.btn_digit("6")),
            ("", 2, 3, "op", None),
            ("1", 3, 0, "num", lambda: self.btn_digit("1")),
            ("2", 3, 1, "num", lambda: self.btn_digit("2")),
            ("3", 3, 2, "num", lambda: self.btn_digit("3")),
            ("", 3, 3, "op", None),
            (",", 4, 0, "num", self.btn_comma),
            ("0", 4, 1, "num", lambda: self.btn_digit("0")),
            ("", 4, 2, "op", None),
            ("=", 4, 3, "equal", self.btn_convert),
        ]

        for text, r, c, btype, cmd in buttons:
            if text == "" and cmd is None:
                spacer = tk.Frame(keypad, bg=self.bg_color)
                spacer.grid(row=r, column=c, padx=2, pady=2, sticky="nsew")
                continue

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

            btn = self._make_button(keypad, text, fnt, bg, fg, hover, cmd)
            btn.grid(row=r, column=c, padx=2, pady=2, sticky="nsew")

    def _make_button(
        self,
        parent: tk.Misc,
        text: str,
        fnt,
        bg: str,
        fg: str,
        hover: str,
        cmd,
        track_unit: tuple[str, str] | None = None,
    ) -> tk.Button:
        btn = tk.Button(
            parent,
            text=text,
            font=fnt,
            bg=bg,
            fg=fg,
            activebackground=hover,
            activeforeground=fg,
            relief="flat",
            bd=0,
            command=cmd,
            cursor="hand2",
        )
        btn.bind("<Enter>", lambda _e, b=btn, h=hover: b.config(bg=h))
        btn.bind(
            "<Leave>",
            lambda _e, b=btn, orig=bg, track=track_unit: self._on_leave_btn(b, orig, track),
        )
        return btn

    def _on_leave_btn(
        self,
        btn: tk.Button,
        orig: str,
        track: tuple[str, str] | None,
    ) -> None:
        if track is None:
            btn.config(bg=orig)
            return
        kind, unit = track
        selected = (
            unit == self.from_unit if kind == "from" else unit == self.to_unit
        )
        btn.config(
            bg=self.btn_unit_on if selected else self.btn_unit_off,
            fg=self.equal_text_color if selected else self.text_color,
        )

    def _bind_keys(self) -> None:
        for digit in "0123456789":
            self.bind(digit, lambda _e, d=digit: self.btn_digit(d))
        self.bind("<Return>", lambda _e: self.btn_convert())
        self.bind("<KP_Enter>", lambda _e: self.btn_convert())
        self.bind("<BackSpace>", lambda _e: self.btn_backspace())
        self.bind("<Escape>", lambda _e: self.btn_clear_all())
        self.bind(".", lambda _e: self.btn_comma())
        self.bind(",", lambda _e: self.btn_comma())

    def _set_from_unit(self, unit: str) -> None:
        self.from_unit = unit
        self._refresh_unit_buttons()
        self._sync_expression()

    def _set_to_unit(self, unit: str) -> None:
        self.to_unit = unit
        self._refresh_unit_buttons()
        self._sync_expression()

    def btn_swap_units(self) -> None:
        self.from_unit, self.to_unit = self.to_unit, self.from_unit
        self._refresh_unit_buttons()
        self._sync_expression()

    def _refresh_unit_buttons(self) -> None:
        for unit, btn in self._from_btns.items():
            selected = unit == self.from_unit
            btn.config(
                bg=self.btn_unit_on if selected else self.btn_unit_off,
                fg=self.equal_text_color if selected else self.text_color,
                activebackground=self.btn_equal_hover if selected else self.btn_op_hover,
            )
        for unit, btn in self._to_btns.items():
            selected = unit == self.to_unit
            btn.config(
                bg=self.btn_unit_on if selected else self.btn_unit_off,
                fg=self.equal_text_color if selected else self.text_color,
                activebackground=self.btn_equal_hover if selected else self.btn_op_hover,
            )

    def _format_display_font(self, text: str) -> None:
        if len(text) > 13:
            self.lbl_main.config(font=("Segoe UI Variable Display", 22, "bold"))
        elif len(text) > 9:
            self.lbl_main.config(font=("Segoe UI Variable Display", 26, "bold"))
        else:
            self.lbl_main.config(font=self.font_main)

    def _update_display(self) -> None:
        text = str(self.current_input)
        self._format_display_font(text)
        self.lbl_main.config(text=text)
        self.lbl_expr.config(text=self.expression_text)

    def _sync_expression(self) -> None:
        if self.current_input not in ("Error", "Entrada no válida", "Desbordamiento"):
            self.expression_text = f"{self.current_input} {self.from_unit} → {self.to_unit}"
            self._update_display()

    def btn_digit(self, digit: str) -> None:
        if digit not in "0123456789":
            return
        if self.reset_on_next_input or self.current_input in (
            "Error",
            "Entrada no válida",
            "Desbordamiento",
        ):
            self.current_input = digit
            self.reset_on_next_input = False
        else:
            if self.current_input == "0":
                self.current_input = digit
            elif len(self.current_input.replace(".", "")) < 16:
                self.current_input += digit
        self.expression_text = f"{self.current_input} {self.from_unit} → {self.to_unit}"
        self._update_display()

    def btn_comma(self) -> None:
        if self.reset_on_next_input or self.current_input in (
            "Error",
            "Entrada no válida",
            "Desbordamiento",
        ):
            self.current_input = "0."
            self.reset_on_next_input = False
        elif "." not in self.current_input:
            self.current_input += "."
        self.expression_text = f"{self.current_input} {self.from_unit} → {self.to_unit}"
        self._update_display()

    def btn_backspace(self) -> None:
        if self.reset_on_next_input or self.current_input in (
            "Error",
            "Entrada no válida",
            "Desbordamiento",
        ):
            self.current_input = "0"
            self.reset_on_next_input = False
        elif len(self.current_input) > 1:
            self.current_input = self.current_input[:-1]
        else:
            self.current_input = "0"
        self.expression_text = f"{self.current_input} {self.from_unit} → {self.to_unit}"
        self._update_display()

    def btn_clear_entry(self) -> None:
        self.current_input = "0"
        self.expression_text = f"0 {self.from_unit} → {self.to_unit}"
        self._update_display()

    def btn_clear_all(self) -> None:
        self.current_input = "0"
        self.from_unit = "m"
        self.to_unit = "cm"
        self.reset_on_next_input = False
        self.expression_text = ""
        self._refresh_unit_buttons()
        self._update_display()

    def btn_convert(self) -> None:
        try:
            result = convert(self.current_input, self.from_unit, self.to_unit)
            self.expression_text = (
                f"{self.current_input} {self.from_unit} → {self.to_unit} ="
            )
            if float(result).is_integer() and abs(result) < 1e12:
                self.current_input = str(int(result))
            else:
                self.current_input = str(result)
            self.reset_on_next_input = True
            self._update_display()
        except ConversionError:
            self.expression_text = (
                f"{self.current_input} {self.from_unit} → {self.to_unit} ="
            )
            self.current_input = "Entrada no válida"
            self.reset_on_next_input = True
            self._update_display()


def main() -> None:
    app = LengthConverterApp()
    app.mainloop()


if __name__ == "__main__":
    main()
