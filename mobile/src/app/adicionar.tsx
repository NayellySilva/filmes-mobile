import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import api from "../services/api";

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";

export default function Adicionar() {
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("Filme");
  const [genero, setGenero] = useState("Ficção Científica");
  const [ano, setAno] = useState("");
  const [nota, setNota] = useState("");
  const [urlCapa, setUrlCapa] = useState("");
  const [sinopse, setSinopse] = useState("");

  // Valida os campos obrigatórios e envia o novo filme via HTTP POST para a API
  async function handleAdicionar() {
    // Validação de campos obrigatórios
    if (!titulo.trim() || !urlCapa.trim() || !ano.trim()) {
      if (Platform.OS === "web") {
        alert("Por favor, preencha o Título, o Ano e a URL da Capa.");
      } else {
        Alert.alert("Erro", "Por favor, preencha o Título, o Ano e a URL da Capa.");
      }
      return;
    }

    const anoNum = parseInt(ano, 10);
    const notaNum = parseFloat(nota.replace(",", ".")) || 0;

    // Validação de regras de negócios simples
    if (isNaN(anoNum) || anoNum < 1888 || anoNum > 2100) {
      if (Platform.OS === "web") {
        alert("Por favor, insira um ano de lançamento válido.");
      } else {
        Alert.alert("Erro", "Por favor, insira um ano de lançamento válido.");
      }
      return;
    }

    if (notaNum < 0 || notaNum > 10) {
      if (Platform.OS === "web") {
        alert("Por favor, insira uma nota de 0 a 10.");
      } else {
        Alert.alert("Erro", "Por favor, insira uma nota de 0 a 10.");
      }
      return;
    }

    try {
      // Método HTTP POST enviando os dados em português estruturados para o JSON Server
      await api.post("/filmes", {
        titulo: titulo.trim(),
        tipo,
        genero,
        ano: anoNum,
        nota: notaNum,
        capa: urlCapa.trim(),
        sinopse: sinopse.trim(),
        favorito: false,
      });

      // Redirecionamento e feedback conforme o ambiente de teste (Web ou Celular)
      if (Platform.OS === "web") {
        alert(`"${titulo}" foi adicionado com sucesso ao catálogo!`);
        limparCampos();
        router.replace("/");
      } else {
        Alert.alert("Sucesso", `"${titulo}" foi adicionado com sucesso ao catálogo!`, [
          {
            text: "OK",
            onPress: () => {
              limparCampos();
              router.replace("/");
            },
          },
        ]);
      }
    } catch (error) {
      console.error("Erro ao adicionar título:", error);
      if (Platform.OS === "web") {
        alert("Não foi possível salvar o título no servidor.");
      } else {
        Alert.alert("Erro", "Não foi possível salvar o título no servidor.");
      }
    }
  }

  function limparCampos() {
    setTitulo("");
    setTipo("Filme");
    setGenero("Ficção Científica");
    setAno("");
    setNota("");
    setUrlCapa("");
    setSinopse("");
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
            activeOpacity={0.7}
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
            <View style={styles.tipoContainer}>
              {["Filme", "Série"].map((item) => {
                const active = tipo === item;
                return (
                  <TouchableOpacity
                    key={item}
                    style={[styles.tipoButton, active && styles.tipoButtonActive]}
                    onPress={() => setTipo(item)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.tipoText, active && styles.tipoTextActive]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.half}>
            <Text style={styles.label}>ANO *</Text>
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

        <Text style={styles.label}>GÊNERO</Text>
        <View style={styles.tagContainer}>
          {["Ação", "Aventura", "Comédia", "Drama", "Fantasia", "Ficção Científica"].map(
            (item) => {
              const active = genero === item;
              return (
                <TouchableOpacity
                  key={item}
                  style={[styles.tagButton, active && styles.tagButtonActive]}
                  onPress={() => setGenero(item)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.tagText, active && styles.tagTextActive]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }
          )}
        </View>

        <Text style={styles.label}>NOTA</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 9.8"
          placeholderTextColor="#7A8395"
          value={nota}
          onChangeText={setNota}
          keyboardType="numeric"
        />

        <Text style={styles.label}>URL DA CAPA *</Text>
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

  tipoContainer: {
    flexDirection: "row",
    gap: 8,
  },

  tipoButton: {
    flex: 1,
    height: 52,
    backgroundColor: "#0B1325",
    borderWidth: 1,
    borderColor: "#1B2740",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  tipoButtonActive: {
    backgroundColor: "#FF1F3D",
    borderColor: "#FF1F3D",
  },

  tipoText: {
    color: "#7A8395",
    fontSize: 15,
    fontWeight: "600",
  },

  tipoTextActive: {
    color: "#FFFFFF",
  },

  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  tagButton: {
    backgroundColor: "#0B1325",
    borderWidth: 1,
    borderColor: "#1B2740",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  tagButtonActive: {
    backgroundColor: "#FF1F3D",
    borderColor: "#FF1F3D",
  },

  tagText: {
    color: "#7A8395",
    fontSize: 14,
    fontWeight: "600",
  },

  tagTextActive: {
    color: "#FFFFFF",
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
