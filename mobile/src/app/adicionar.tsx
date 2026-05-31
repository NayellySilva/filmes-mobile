import { router } from "expo-router";
import { ChevronDown, ArrowLeft } from "lucide-react-native";
import { useState } from "react";

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Adicionar() {
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("Filme");
  const [mostrarTipo, setMostrarTipo] = useState(false);
  const [genero, setGenero] = useState("Ficção Científica");
  const [mostrarGenero, setMostrarGenero] = useState(false);
  const [ano, setAno] = useState("");
  const [nota, setNota] = useState("");
  const [urlCapa, setUrlCapa] = useState("");
  const [sinopse, setSinopse] = useState("");

  function handleAdicionar() {
    Alert.alert(
      "Sucesso",
      `${titulo || "O título"} foi preparado para ser adicionado ao catálogo.`,
    );
  }

  function limparCampos() {
    setTitulo("");
    setTipo("Filme");
    setGenero("Ficção Científica");
    setAno("");
    setNota("");
    setUrlCapa("");
    setSinopse("");
    setMostrarTipo(false);
    setMostrarGenero(false);
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.replace("/")}
          >
            <ArrowLeft size={20} color="#94A3B8" />
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Adicionar título</Text>
          <Text style={styles.description}>
            Cadastre um novo filme ou série no catálogo.
          </Text>
        </View>

        <Text style={styles.label}>TÍTULO *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Interestelar"
          placeholderTextColor="#7A8395"
          value={titulo}
          onChangeText={setTitulo}
        />

        <View style={styles.row}>
          <View style={styles.half}>
            <Text style={styles.label}>TIPO</Text>

            <View style={styles.accordion}>
              <TouchableOpacity
                style={styles.accordionHeader}
                onPress={() => setMostrarTipo(!mostrarTipo)}
              >
                <Text style={styles.selectText}>{tipo}</Text>
                <ChevronDown size={16} color="#7A8395" />
              </TouchableOpacity>

              {mostrarTipo && (
                <View style={styles.accordionContent}>
                  {["Filme", "Série"].map((item) => (
                    <TouchableOpacity
                      key={item}
                      style={styles.accordionItem}
                      onPress={() => {
                        setTipo(item);
                        setMostrarTipo(false);
                      }}
                    >
                      <Text style={styles.dropdownText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>

          <View style={styles.half}>
            <Text style={styles.label}>ANO</Text>

            <TextInput
              style={styles.input}
              placeholder="2026"
              placeholderTextColor="#7A8395"
              value={ano}
              onChangeText={setAno}
              keyboardType="numeric"
              maxLength={4}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.half}>
            <Text style={styles.label}>GÊNERO</Text>

            <View style={styles.accordion}>
              <TouchableOpacity
                style={styles.accordionHeader}
                onPress={() => setMostrarGenero(!mostrarGenero)}
              >
                <Text style={styles.selectText} numberOfLines={1}>
                  {genero}
                </Text>
                <ChevronDown size={16} color="#7A8395" />
              </TouchableOpacity>

              {mostrarGenero && (
                <View style={styles.accordionContent}>
                  {["Ação", "Aventura", "Comédia", "Drama", "Fantasia"].map(
                    (item) => (
                      <TouchableOpacity
                        key={item}
                        style={styles.accordionItem}
                        onPress={() => {
                          setGenero(item);
                          setMostrarGenero(false);
                        }}
                      >
                        <Text style={styles.dropdownText}>{item}</Text>
                      </TouchableOpacity>
                    ),
                  )}
                </View>
              )}
            </View>
          </View>

          <View style={styles.half}>
            <Text style={styles.label}>NOTA</Text>

            <TextInput
              style={styles.input}
              placeholder="0 a 10"
              placeholderTextColor="#7A8395"
              value={nota}
              onChangeText={setNota}
              keyboardType="numeric"
            />
          </View>
        </View>

        <Text style={styles.label}>URL DA CAPA</Text>
        <TextInput
          style={styles.input}
          placeholder="https://"
          placeholderTextColor="#7A8395"
          value={urlCapa}
          onChangeText={setUrlCapa}
        />

        <Text style={styles.label}>SINOPSE</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Resumo da história"
          placeholderTextColor="#7A8395"
          value={sinopse}
          onChangeText={setSinopse}
          multiline
        />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.addButton} onPress={handleAdicionar}>
            <Text style={styles.buttonText}>Adicionar ao catálogo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={limparCampos}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 120,
  },

  header: {
    gap: 3,
    marginBottom: 10,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  backText: {
    color: "#94A3B8",
    fontSize: 14,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "800",
  },

  description: {
    color: "#9AA4B2",
    fontSize: 15,
    marginBottom: 8,
  },

  label: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 8,
    marginTop: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  half: {
    width: "48%",
  },

  input: {
    height: 52,
    backgroundColor: "#0B1325",
    borderWidth: 1,
    borderColor: "#1B2740",
    borderRadius: 14,
    paddingHorizontal: 14,
    color: "#FFFFFF",
    fontSize: 15,
  },

  accordion: {
    width: "100%",
    backgroundColor: "#0B1325",
    borderWidth: 1,
    borderColor: "#1B2740",
    borderRadius: 14,
    overflow: "hidden",
  },

  accordionHeader: {
    height: 52,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },

  accordionContent: {
    borderTopWidth: 1,
    borderTopColor: "#1B2740",
  },

  accordionItem: {
    paddingVertical: 13,
    paddingHorizontal: 14,
  },

  selectText: {
    color: "#FFFFFF",
    fontSize: 15,
    flex: 1,
  },

  dropdownText: {
    color: "#FFFFFF",
    fontSize: 14,
  },

  textArea: {
    backgroundColor: "#0B1325",
    borderWidth: 1,
    borderColor: "#1B2740",
    borderRadius: 14,
    padding: 14,
    height: 130,
    color: "#FFFFFF",
    textAlignVertical: "top",
    fontSize: 15,
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    gap: 12,
  },

  addButton: {
    flex: 1,
    backgroundColor: "#FF1F3D",
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: "center",
  },

  cancelButton: {
    width: 110,
    backgroundColor: "#111B2D",
    borderWidth: 1,
    borderColor: "#24324D",
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
});
