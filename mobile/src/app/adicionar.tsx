import { router } from "expo-router";
import { useState } from 'react';
import {
  
  
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function Adicionar() {
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('Filme');
  const [mostrarTipo, setMostrarTipo] = useState(false);
  const [genero, setGenero] = useState('Ficção Científica');
const [mostrarGenero, setMostrarGenero] = useState(false);
  const [nota, setNota] = useState('');
  const [urlCapa, setUrlCapa] = useState('');
  const [sinopse, setSinopse] = useState('');

  const handleAdicionar = () => {
    Alert.alert(
      'Sucesso',
      `${titulo} foi preparado para ser adicionado ao catálogo.`
    );
  };

  const limparCampos = () => {
  setTitulo('');
  setTipo('Filme');
  setNota('');
  setUrlCapa('');
  setSinopse('');
  setMostrarTipo(false);
};

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
  <TouchableOpacity
    style={styles.backButton}
    onPress={() => router.back()}
  >
   

    <ThemedText style={styles.backText}>
     ← Voltar
    </ThemedText>
  </TouchableOpacity>

  <ThemedText style={styles.title}>
    Adicionar ao Catálogo
  </ThemedText>
</View>

        <ThemedText style={styles.description}>
          Cadastre um novo filme ou série no catálogo.
        </ThemedText>

        <ThemedText style={styles.label}>TÍTULO *</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Ex: Interestelar"
          placeholderTextColor="#7A8395"
          value={titulo}
          onChangeText={setTitulo}
        />

        <View style={styles.row}>
          <View style={styles.half}>
            <ThemedText style={styles.label}>TIPO</ThemedText>

            <TouchableOpacity
              style={styles.selectContainer}
              onPress={() => setMostrarTipo(!mostrarTipo)}
            >
              <ThemedText style={styles.selectText}>
                {tipo}
              </ThemedText>

              <ThemedText style={styles.arrow}>
                ▼
              </ThemedText>
            </TouchableOpacity>

            {mostrarTipo && (
              <View style={styles.dropdown}>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setTipo('Filme');
                    setMostrarTipo(false);
                  }}
                >
                  <ThemedText style={styles.dropdownText}>
                    Filme
                  </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setTipo('Série');
                    setMostrarTipo(false);
                  }}
                >
                  <ThemedText style={styles.dropdownText}>
                    Série
                  </ThemedText>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.half}>
            <ThemedText style={styles.label}>ANO</ThemedText>

            <TextInput
  style={styles.input}
  placeholder="2026"
  placeholderTextColor="#7A8395"
  keyboardType="numeric"
  maxLength={4}
/>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.half}>
  <ThemedText style={styles.label}>GÊNERO</ThemedText>

  <TouchableOpacity
    style={styles.selectContainer}
    onPress={() => setMostrarGenero(!mostrarGenero)}
  >
    <ThemedText style={styles.selectText}>
      {genero}
    </ThemedText>

    <ThemedText style={styles.arrow}>
      ▼
    </ThemedText>
  </TouchableOpacity>

  {mostrarGenero && (
    <View style={styles.dropdown}>
      {[
        'Ação',
        'Aventura',
        'Comédia',
        'Drama',
        'Fantasia',
        'Ficção Científica',
        'Romance',
        'Suspense',
        'Terror',
        'Documentário',
        'Animação',
      ].map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.dropdownItem}
          onPress={() => {
            setGenero(item);
            setMostrarGenero(false);
          }}
        >
          <ThemedText style={styles.dropdownText}>
            {item}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  )}
</View>

          <View style={styles.half}>
            <ThemedText style={styles.label}>NOTA (0-10)</ThemedText>

            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor="#7A8395"
              value={nota}
              onChangeText={setNota}
              keyboardType="numeric"
            />
          </View>
        </View>

        <ThemedText style={styles.label}>URL DA CAPA</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="https://"
          placeholderTextColor="#7A8395"
          value={urlCapa}
          onChangeText={setUrlCapa}
        />

        <ThemedText style={styles.label}>SINOPSE</ThemedText>
        <TextInput
          style={styles.textArea}
          placeholder="Resumo da história"
          placeholderTextColor="#7A8395"
          value={sinopse}
          onChangeText={setSinopse}
          multiline
        />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAdicionar}
          >
            <ThemedText style={styles.buttonText}>
              Adicionar ao catálogo
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
  style={styles.cancelButton}
  onPress={limparCampos}
>
  <ThemedText style={styles.buttonText}>
    Cancelar
  </ThemedText>
</TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },

  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 70,
    paddingBottom: 40,
  },

  header: {
  marginTop: 24,
  gap: 5,
},

backButton: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 5,
},

backText: {
  color: '#94A3B8',
  fontSize: 14,
},

  title: {
  fontSize: 28,
  fontWeight: '800',
  color: '#FFFFFF',
  lineHeight: 32,
},

  description: {
    color: '#9AA4B2',
    fontSize: 13,
    marginBottom: 26,
  },

  label: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  half: {
    width: '48%',
  },

  input: {
    backgroundColor: '#0B1325',
    borderWidth: 1,
    borderColor: '#1B2740',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 15,
    color: '#FFFFFF',
  },

  selectContainer: {
    backgroundColor: '#0B1325',
    borderWidth: 1,
    borderColor: '#1B2740',
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  selectText: {
    color: '#FFFFFF',
    fontSize: 15,
  },

  arrow: {
    color: '#7A8395',
    fontSize: 11,
  },

  dropdown: {
  backgroundColor: '#0B1325',
  borderWidth: 1,
  borderColor: '#1B2740',
  borderRadius: 12,
  marginTop: 6,
  overflow: 'hidden',
},

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
  },

  dropdownText: {
    color: '#FFFFFF',
    fontSize: 14,
  },

  textArea: {
    backgroundColor: '#0B1325',
    borderWidth: 1,
    borderColor: '#1B2740',
    borderRadius: 12,
    padding: 14,
    height: 130,
    color: '#FFFFFF',
    textAlignVertical: 'top',
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },

  addButton: {
    flex: 1,
    backgroundColor: '#FF1F3D',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginRight: 12,
  },

  cancelButton: {
    width: 110,
    backgroundColor: '#111B2D',
    borderWidth: 1,
    borderColor: '#24324D',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
});