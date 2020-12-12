import '../ProductForm.css';
import CategoriesTree from './tree/CategoriesTree'


export default function EditCategoriesForm() {

    return (
        <div className="product-form">
            <h2>Edit categories</h2>
            <CategoriesTree />
        </div>
    );
}
