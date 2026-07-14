import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const MODULES = [
  {
    id: "1",
    title: "Vocabulario básico",
    description: "Saludos, objetos y acciones del día a día",
    icon: "🤟",
    lessons: 8,
    color: "#194650",
  },
  {
    id: "2",
    title: "Frases simples",
    description: "Combiná señas para formar oraciones",
    icon: "💬",
    lessons: 6,
    color: "#DAB16D",
  },
  {
    id: "3",
    title: "Comunicación cotidiana",
    description: "Presentarse, pedir ayuda, comprar",
    icon: "🙌",
    lessons: 5,
    color: "#194650",
  },
  {
    id: "4",
    title: "Cultura e inclusión",
    description: "Conocé la comunidad sorda",
    icon: "❤️",
    lessons: 4,
    color: "#DAB16D",
  },
];

export function Home() {
  const navigation = useNavigation<any>();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F8F8F8" }}
      contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
    >
      {/* Header */}
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          color: "#194650",
          marginBottom: 4,
        }}
      >
        ¡Hola! 👋
      </Text>
      <Text
        style={{
          fontSize: 15,
          color: "#989898",
          marginBottom: 28,
        }}
      >
        ¿Qué querés aprender hoy?
      </Text>

      {/* Módulos */}
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          color: "#194650",
          marginBottom: 16,
        }}
      >
        Módulos
      </Text>

      {MODULES.map((mod) => (
        <TouchableOpacity
          key={mod.id}
          onPress={() =>
            navigation.navigate("ModuleDetail", { moduleId: mod.id, title: mod.title })
          }
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
            flexDirection: "row",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 8,
            elevation: 2,
          }}
        >
          {/* Ícono */}
          <View
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              backgroundColor: mod.color,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 16,
            }}
          >
            <Text style={{ fontSize: 26 }}>{mod.icon}</Text>
          </View>

          {/* Texto */}
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#194650",
                marginBottom: 4,
              }}
            >
              {mod.title}
            </Text>
            <Text style={{ fontSize: 13, color: "#989898" }}>
              {mod.description}
            </Text>
            <Text
              style={{ fontSize: 12, color: "#DAB16D", marginTop: 6, fontWeight: "500" }}
            >
              {mod.lessons} lecciones
            </Text>
          </View>

          {/* Flecha */}
          <Text style={{ fontSize: 20, color: "#989898" }}>›</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}