import React, { createContext, useContext } from 'react';
import { notification } from 'antd';

// Pour éviter de recommencer ce code dans chaque composant : 

// Création d'un contexte pour les notifications )
const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

// Composant fournisseur pour les notifications
const NotificationProvider = ({ children }) => {
  // Paramètres notifications, ils s'empiles à partir de 1
  const [api, contextHolder] = notification.useNotification({
    stack: {
      threshold: 1,
    }
  });

  // Fonction pour ouvrir une notification
  const ouvreNotification = (type, message, description, duration) => {
    api[type]({
      message: message,
      description: description,
      duration: duration,
    });
  };

  return (
    <NotificationContext.Provider value={ouvreNotification}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
