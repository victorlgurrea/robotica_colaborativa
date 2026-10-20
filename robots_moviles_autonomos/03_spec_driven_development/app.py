"""
Punto de entrada e interfaz gráfica del conversor (CustomTkinter).

Ejecutar:
    python app.py
    o  .\\run.bat
"""

from __future__ import annotations

import customtkinter as ctk

from logica import (
    DESTINO_POR_DEFECTO,
    ORIGEN_POR_DEFECTO,
    RESULTADO_VACIO,
    UNIDADES_ORDENADAS,
    ConversionError,
    convertir,
    formatear_resultado,
    intercambiar_unidades,
)


# ---------------------------------------------------------------------------
# Tema visual (estilo Calculadora Windows 11)
# ---------------------------------------------------------------------------

class Tema:
    FONDO = "#202020"
    SUPERFICIE = "#3b3b3b"
    BOTON = "#323232"
    BOTON_HOVER = "#3f3f3f"
    ACENTO = "#4cc2ff"
    ACENTO_HOVER = "#40b0e8"
    TEXTO = "#ffffff"
    TEXTO_SUAVE = "#a0a0a0"
    ERROR = "#ff6b7a"
    TEXTO_EN_ACENTO = "#000000"
    FUENTE = "Segoe UI"


# ---------------------------------------------------------------------------
# Ventana principal
# ---------------------------------------------------------------------------

class ConversorApp(ctk.CTk):
    """Ventana: Valor + Origen/Destino + Convertir / Limpiar / Intercambiar."""

    def __init__(self) -> None:
        super().__init__()
        self._configurar_ventana()
        self._crear_estado()
        self._construir_interfaz()

    # -- configuración -----------------------------------------------------

    def _configurar_ventana(self) -> None:
        ctk.set_appearance_mode("dark")
        ctk.set_default_color_theme("dark-blue")
        self.title("Conversor de longitudes")
        self.geometry("420x520")
        self.minsize(380, 480)
        self.resizable(False, False)
        self.configure(fg_color=Tema.FONDO)

    def _crear_estado(self) -> None:
        self.valor_var = ctk.StringVar(value="")
        self.origen_var = ctk.StringVar(value=ORIGEN_POR_DEFECTO)
        self.destino_var = ctk.StringVar(value=DESTINO_POR_DEFECTO)
        self.resultado_var = ctk.StringVar(value=RESULTADO_VACIO)

    # -- UI ----------------------------------------------------------------

    def _construir_interfaz(self) -> None:
        self._seccion_cabecera()
        self._seccion_valor()
        self._seccion_unidades()
        self._seccion_resultado()
        self._seccion_acciones()
        self.bind("<Return>", lambda _evento: self.convertir())
        self.entry_valor.focus()

    def _seccion_cabecera(self) -> None:
        ctk.CTkLabel(
            self,
            text="Conversor",
            font=ctk.CTkFont(family=Tema.FUENTE, size=22, weight="bold"),
            text_color=Tema.TEXTO,
        ).pack(anchor="w", padx=24, pady=(24, 4))

        ctk.CTkLabel(
            self,
            text="mm  ·  cm  ·  m",
            font=ctk.CTkFont(family=Tema.FUENTE, size=13),
            text_color=Tema.TEXTO_SUAVE,
        ).pack(anchor="w", padx=24, pady=(0, 16))

    def _seccion_valor(self) -> None:
        self._etiqueta("Valor")
        self.entry_valor = ctk.CTkEntry(
            self,
            textvariable=self.valor_var,
            height=44,
            font=ctk.CTkFont(family=Tema.FUENTE, size=18),
            fg_color=Tema.SUPERFICIE,
            border_color=Tema.BOTON,
            text_color=Tema.TEXTO,
            placeholder_text="Escribe un número…",
        )
        self.entry_valor.pack(fill="x", padx=24, pady=(0, 12))

    def _seccion_unidades(self) -> None:
        marco = ctk.CTkFrame(self, fg_color="transparent")
        marco.pack(fill="x", padx=24, pady=8)
        marco.columnconfigure(0, weight=1)
        marco.columnconfigure(1, weight=1)

        ctk.CTkLabel(
            marco, text="Origen", text_color=Tema.TEXTO_SUAVE, font=ctk.CTkFont(size=12)
        ).grid(row=0, column=0, sticky="w", padx=(0, 8))
        ctk.CTkLabel(
            marco, text="Destino", text_color=Tema.TEXTO_SUAVE, font=ctk.CTkFont(size=12)
        ).grid(row=0, column=1, sticky="w", padx=(8, 0))

        self.menu_origen = self._menu_unidad(marco, self.origen_var)
        self.menu_origen.grid(row=1, column=0, sticky="ew", padx=(0, 8), pady=(4, 0))

        self.menu_destino = self._menu_unidad(marco, self.destino_var)
        self.menu_destino.grid(row=1, column=1, sticky="ew", padx=(8, 0), pady=(4, 0))

    def _seccion_resultado(self) -> None:
        self._etiqueta("Resultado", pady_top=16)
        self.lbl_resultado = ctk.CTkLabel(
            self,
            textvariable=self.resultado_var,
            font=ctk.CTkFont(family=Tema.FUENTE, size=28, weight="bold"),
            text_color=Tema.TEXTO,
            anchor="e",
            fg_color=Tema.SUPERFICIE,
            corner_radius=8,
            height=64,
        )
        self.lbl_resultado.pack(fill="x", padx=24, pady=(0, 20))

    def _seccion_acciones(self) -> None:
        marco = ctk.CTkFrame(self, fg_color="transparent")
        marco.pack(fill="x", padx=24, pady=(0, 8))
        marco.columnconfigure((0, 1), weight=1)

        ctk.CTkButton(
            marco,
            text="Intercambiar",
            command=self.intercambiar,
            height=42,
            fg_color=Tema.BOTON,
            hover_color=Tema.BOTON_HOVER,
            font=ctk.CTkFont(size=13, weight="bold"),
        ).grid(row=0, column=0, columnspan=2, sticky="ew", pady=(0, 8))

        ctk.CTkButton(
            marco,
            text="Limpiar",
            command=self.limpiar,
            height=44,
            fg_color=Tema.BOTON,
            hover_color=Tema.BOTON_HOVER,
            font=ctk.CTkFont(size=14, weight="bold"),
        ).grid(row=1, column=0, sticky="ew", padx=(0, 6))

        ctk.CTkButton(
            marco,
            text="Convertir",
            command=self.convertir,
            height=44,
            fg_color=Tema.ACENTO,
            hover_color=Tema.ACENTO_HOVER,
            text_color=Tema.TEXTO_EN_ACENTO,
            font=ctk.CTkFont(size=14, weight="bold"),
        ).grid(row=1, column=1, sticky="ew", padx=(6, 0))

    # -- helpers de UI -----------------------------------------------------

    def _etiqueta(self, texto: str, pady_top: int = 8) -> None:
        ctk.CTkLabel(
            self,
            text=texto,
            font=ctk.CTkFont(size=12),
            text_color=Tema.TEXTO_SUAVE,
        ).pack(anchor="w", padx=24, pady=(pady_top, 8))

    def _menu_unidad(self, padre: ctk.CTkFrame, variable: ctk.StringVar) -> ctk.CTkOptionMenu:
        return ctk.CTkOptionMenu(
            padre,
            variable=variable,
            values=list(UNIDADES_ORDENADAS),
            height=40,
            fg_color=Tema.BOTON,
            button_color=Tema.SUPERFICIE,
            button_hover_color=Tema.ACENTO,
            dropdown_fg_color="#2b2b2b",
            font=ctk.CTkFont(size=14, weight="bold"),
        )

    def _mostrar_resultado(self, texto: str, *, error: bool = False) -> None:
        self.resultado_var.set(texto)
        self.lbl_resultado.configure(
            text_color=Tema.ERROR if error else Tema.TEXTO
        )

    # -- acciones (SPEC R4, R5, R8) ----------------------------------------

    def convertir(self) -> None:
        try:
            resultado = convertir(
                self.valor_var.get(),
                self.origen_var.get(),
                self.destino_var.get(),
            )
            self._mostrar_resultado(
                formatear_resultado(resultado, self.destino_var.get())
            )
        except ConversionError as exc:
            self._mostrar_resultado(f"Error: {exc}", error=True)

    def limpiar(self) -> None:
        self.valor_var.set("")
        self.origen_var.set(ORIGEN_POR_DEFECTO)
        self.destino_var.set(DESTINO_POR_DEFECTO)
        self._mostrar_resultado(RESULTADO_VACIO)
        self.entry_valor.focus()

    def intercambiar(self) -> None:
        """Conserva el Valor, limpia el resultado a — y no convierte."""
        nuevo_origen, nuevo_destino = intercambiar_unidades(
            self.origen_var.get(),
            self.destino_var.get(),
        )
        self.origen_var.set(nuevo_origen)
        self.destino_var.set(nuevo_destino)
        self._mostrar_resultado(RESULTADO_VACIO)


# ---------------------------------------------------------------------------
# Entrada
# ---------------------------------------------------------------------------

def main() -> None:
    ConversorApp().mainloop()


if __name__ == "__main__":
    main()
