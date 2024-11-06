import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // Importar cookie-parser
import { auth } from '../services/firebaseConnection'; // Importar a configuração do Firebase
import { signInWithEmailAndPassword } from 'firebase/auth'; // Importar funções de autenticação

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser()); // Usar o cookie-parser

// Rota para login
app.post('/login', async (req, res) => {
    const { email, password } = req.body; // Alterado para email

    // Validação dos dados
    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
        // Verificação das credenciais
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Aqui você pode gerar um token JWT ou outra forma de autenticação, se necessário
        // Para fins de exemplo, vamos usar o UID do usuário em um cookie
        res.cookie('userUid', user.uid, { httpOnly: true, secure: false }); // Defina secure: true se estiver em HTTPS

        return res.status(200).json({ message: 'Login bem-sucedido', uid: user.uid });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.status(401).json({ message: 'Credenciais inválidas' });
    }
});

// Rota para adicionar um item ao carrinho
app.post('/cart/add', (req, res) => {
    const { item } = req.body; // Item a ser adicionado

    // Verifique se o item está presente
    if (!item) {
        return res.status(400).json({ message: 'Item é obrigatório.' });
    }

    // Obter o carrinho existente do cookie
    const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];

    // Adicionar o novo item ao carrinho
    cart.push(item);

    // Atualizar o cookie do carrinho
    res.cookie('cart', JSON.stringify(cart), { httpOnly: true, secure: false }); // Defina secure: true se estiver em HTTPS

    return res.status(200).json({ message: 'Item adicionado ao carrinho', cart });
});

// Rota para obter o carrinho
app.get('/cart', (req, res) => {
    const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
    return res.status(200).json({ cart });
});

// Rota para remover um item do carrinho
app.post('/cart/remove', (req, res) => {
    const { itemId } = req.body; // ID do item a ser removido

    // Obter o carrinho existente do cookie
    let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];

    // Filtrar o carrinho para remover o item
    cart = cart.filter(item => item.id !== itemId); // Supondo que cada item tenha uma propriedade `id`

    // Atualizar o cookie do carrinho
    res.cookie('cart', JSON.stringify(cart), { httpOnly: true, secure: false }); // Defina secure: true se estiver em HTTPS

    return res.status(200).json({ message: 'Item removido do carrinho', cart });
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});