"""
Conversor de longitudes — interfaz CustomTkinter (Sesión 2).
"""

from __future__ import annotations

import customtkinter as ctk

from logica import (
    RESULTADO_VACIO,
    ConversionError,
    convert,
    formatear_resultado,
    intercambiar_unidades,
)

UNIDADES = ["mm", "cm", "m"]


class ConversorApp(ctk.CTk):
    def __init__(self) -> None:
        super().__init__()

        ctk.set_appearance_mode("dark")
        ctk.set_default_color_theme("dark-blue")

        self.title("Conversor de longitudes")
        self.geometry("420x520")
        self.minsize(380, 480)
        self.resizable(False, False)

        self.configure(fg_color="#202020")

        self.valor_var = ctk.StringVar(value="")
        self.origen_var = ctk.StringVar(value="mm")
        self.destino_var = ctk.StringVar(value="m")
        self.resultado_var = ctk.StringVar(value=RESULTADO_VACIO)

        self._build_ui()

    def _build_ui(self) -> None:
        pad = {"padx": 24, "pady": 8}

        ctk.CTkLabel(
            self,
            text="Conversor",
            font=ctk.CTkFont(family="Segoe UI", size=22, weight="bold"),
            text_color="#ffffff",
        ).pack(anchor="w", padx=24, pady=(24, 4))

        ctk.CTkLabel(
            self,
            text="mm  ·  cm  ·  m",
            font=ctk.CTkFont(family="Segoe UI", size=13),
            text_color="#a0a0a0",
        ).pack(anchor="w", padx=24, pady=(0, 16))

        ctk.CTkLabel(
            self,
            text="Valor",
            font=ctk.CTkFont(size=12),
            text_color="#a0a0a0",
        ).pack(anchor="w", **pad)

        self.entry_valor = ctk.CTkEntry(
            self,
            textvariable=self.valor_var,
            height=44,
            font=ctk.CTkFont(family="Segoe UI", size=18),
            fg_color="#3b3b3b",
            border_color="#323232",
            text_color="#ffffff",
            placeholder_text="Escribe un número…",
        )
        self.entry_valor.pack(fill="x", padx=24, pady=(0, 12))

        selectors = ctk.CTkFrame(self, fg_color="transparent")
        selectors.pack(fill="x", padx=24, pady=8)
        selectors.columnconfigure(0, weight=1)
        selectors.columnconfigure(1, weight=1)

        ctk.CTkLabel(
            selectors, text="Origen", text_color="#a0a0a0", font=ctk.CTkFont(size=12)
        ).grid(row=0, column=0, sticky="w", padx=(0, 8))
        ctk.CTkLabel(
            selectors, text="Destino", text_color="#a0a0a0", font=ctk.CTkFont(size=12)
        ).grid(row=0, column=1, sticky="w", padx=(8, 0))

        self.menu_origen = ctk.CTkOptionMenu(
            selectors,
            variable=self.origen_var,
            values=UNIDADES,
            height=40,
            fg_color="#323232",
            button_color="#3b3b3b",
            button_hover_color="#4cc2ff",
            dropdown_fg_color="#2b2b2b",
            font=ctk.CTkFont(size=14, weight="bold"),
        )
        self.menu_origen.grid(row=1, column=0, sticky="ew", padx=(0, 8), pady=(4, 0))

        self.menu_destino = ctk.CTkOptionMenu(
            selectors,
            variable=self.destino_var,
            values=UNIDADES,
            height=40,
            fg_color="#323232",
            button_color="#3b3b3b",
            button_hover_color="#4cc2ff",
            dropdown_fg_color="#2b2b2b",
            font=ctk.CTkFont(size=14, weight="bold"),
        )
        self.menu_destino.grid(row=1, column=1, sticky="ew", padx=(8, 0), pady=(4, 0))

        ctk.CTkLabel(
            self,
            text="Resultado",
            font=ctk.CTkFont(size=12),
            text_color="#a0a0a0",
        ).pack(anchor="w", padx=24, pady=(16, 4))

        self.lbl_resultado = ctk.CTkLabel(
            self,
            textvariable=self.resultado_var,
            font=ctk.CTkFont(family="Segoe UI", size=28, weight="bold"),
            text_color="#ffffff",
            anchor="e",
            fg_color="#3b3b3b",
            corner_radius=8,
            height=64,
        )
        self.lbl_resultado.pack(fill="x", padx=24, pady=(0, 20))

        acciones = ctk.CTkFrame(self, fg_color="transparent")
        acciones.pack(fill="x", padx=24, pady=(0, 8))
        acciones.columnconfigure((0, 1), weight=1)

        ctk.CTkButton(
            acciones,
            text="Intercambiar",
            command=self._on_intercambiar,
            height=42,
            fg_color="#323232",
            hover_color="#3f3f3f",
            font=ctk.CTkFont(size=13, weight="bold"),
        ).grid(row=0, column=0, columnspan=2, sticky="ew", pady=(0, 8))

        ctk.CTkButton(
            acciones,
            text="Limpiar",
            command=self._on_limpiar,
            height=44,
            fg_color="#323232",
            hover_color="#3f3f3f",
            font=ctk.CTkFont(size=14, weight="bold"),
        ).grid(row=1, column=0, sticky="ew", padx=(0, 6))

        ctk.CTkButton(
            acciones,
            text="Convertir",
            command=self._on_convertir,
            height=44,
            fg_color="#4cc2ff",
            hover_color="#40b0e8",
            text_color="#000000",
            font=ctk.CTkFont(size=14, weight="bold"),
        ).grid(row=1, column=1, sticky="ew", padx=(6, 0))

        self.bind("<Return>", lambda _e: self._on_convertir())
        self.entry_valor.focus()

    def _on_convertir(self) -> None:
        try:
            resultado = convert(
                self.valor_var.get(),
                self.origen_var.get(),
                self.destino_var.get(),
            )
            texto = formatear_resultado(resultado, self.destino_var.get())
            self.resultado_var.set(texto)
            self.lbl_resultado.configure(text_color="#ffffff")
        except ConversionError as exc:
            self.resultado_var.set(f"Error: {exc}")
            self.lbl_resultado.configure(text_color="#ff6b7a")

    def _on_limpiar(self) -> None:
        self.valor_var.set("")
        self.origen_var.set("mm")
        self.destino_var.set("m")
        self.resultado_var.set(RESULTADO_VACIO)
        self.lbl_resultado.configure(text_color="#ffffff")
        self.entry_valor.focus()

    def _on_intercambiar(self) -> None:
        """R8: intercambia unidades, conserva Valor, resultado → —; no convierte."""
        nuevo_origen, nuevo_destino = intercambiar_unidades(
            self.origen_var.get(),
            self.destino_var.get(),
        )
        self.origen_var.set(nuevo_origen)
        self.destino_var.set(nuevo_destino)
        self.resultado_var.set(RESULTADO_VACIO)
        self.lbl_resultado.configure(text_color="#ffffff")


def main() -> None:
    app = ConversorApp()
    app.mainloop()


if __name__ == "__main__":
    main()
