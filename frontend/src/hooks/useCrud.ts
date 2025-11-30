import { useState, useEffect, useCallback } from 'react';
import { useConfirmModal } from './useConfirmModal';

interface CrudService<T, CreateDTO, UpdateDTO> {
    getCategorias?: (filters?: any) => Promise<T[]>;
    getAll?: (filters?: any) => Promise<T[]>;
    create?: (data: CreateDTO) => Promise<T>;
    createCategoria?: (data: CreateDTO) => Promise<T>;
    update?: (id: number, data: UpdateDTO) => Promise<T>;
    updateCategoria?: (id: number, data: UpdateDTO) => Promise<T>;
    delete?: (id: number) => Promise<{ message: string; entity: T }>;
    deleteCategoria?: (id: number) => Promise<{ message: string; entity: T }>;
    hardDelete?: (id: number) => Promise<{ message: string }>;
    hardDeleteCategoria?: (id: number) => Promise<{ message: string }>;
}

interface UseCrudOptions {
    entityName: string;
    entityNamePlural?: string;
    initialFilters?: Record<string, any>;
    autoLoad?: boolean;
}

export const useCrud = <T, CreateDTO = Partial<T>, UpdateDTO = Partial<T>>(
    service: CrudService<T, CreateDTO, UpdateDTO>,
    options: UseCrudOptions,
) => {
    const {
        entityName,
        entityNamePlural = `${entityName}s`,
        initialFilters = {},
        autoLoad = true,
    } = options;

    // Estados
    const [items, setItems] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [filters, setFilters] = useState(initialFilters);

    // Modal de confirmación
    const { modalState, showConfirm, hideConfirm, handleConfirm } = useConfirmModal();

    // Cargar items
    const loadItems = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const loadMethod = service.getCategorias || service.getAll;
            if (!loadMethod) {
                throw new Error('No se encontró método para cargar datos');
            }

            const data = await loadMethod(filters);
            setItems(data);
        } catch (err: any) {
            setError(err.message || `Error al cargar ${entityNamePlural.toLowerCase()}`);
        } finally {
            setLoading(false);
        }
    }, [service, filters, entityNamePlural]);

    // Auto-cargar al montar o cambiar filtros
    useEffect(() => {
        if (autoLoad) {
            loadItems();
        }
    }, [autoLoad, loadItems]);

    // Crear item
    const createItem = async (data: CreateDTO): Promise<boolean> => {
        try {
            const createMethod = service.createCategoria || service.create;
            if (!createMethod) {
                throw new Error('Método create no disponible');
            }

            await createMethod(data);
            setSuccessMessage(`${entityName} creada exitosamente`);
            await loadItems();

            setTimeout(() => setSuccessMessage(null), 3000);
            return true;
        } catch (err: any) {
            setError(err.message || `Error al crear ${entityName.toLowerCase()}`);
            setTimeout(() => setError(null), 5000);
            return false;
        }
    };

    // Actualizar item
    const updateItem = async (id: number, data: UpdateDTO): Promise<boolean> => {
        try {
            const updateMethod = service.updateCategoria || service.update;
            if (!updateMethod) {
                throw new Error('Método update no disponible');
            }

            await updateMethod(id, data);
            setSuccessMessage(`${entityName} actualizada exitosamente`);
            await loadItems();

            setTimeout(() => setSuccessMessage(null), 3000);
            return true;
        } catch (err: any) {
            setError(err.message || `Error al actualizar ${entityName.toLowerCase()}`);
            setTimeout(() => setError(null), 5000);
            return false;
        }
    };

    // Soft delete
    const deleteItem = (id: number) => {
        showConfirm({
            title: `Desactivar ${entityName}`,
            message: `¿Estás seguro de desactivar esta ${entityName.toLowerCase()}?\n\nLa ${entityName.toLowerCase()} quedará inactiva pero no se eliminará permanentemente.`,
            confirmText: 'Desactivar',
            type: 'warning',
            onConfirm: async () => {
                try {
                    const deleteMethod = service.deleteCategoria || service.delete;
                    if (!deleteMethod) {
                        throw new Error('Método delete no disponible');
                    }

                    const result = await deleteMethod(id);
                    setSuccessMessage(result.message);
                    await loadItems();

                    setTimeout(() => setSuccessMessage(null), 3000);
                } catch (err: any) {
                    setError(err.message || `Error al desactivar ${entityName.toLowerCase()}`);
                    setTimeout(() => setError(null), 5000);
                }
            },
        });
    };

    // Hard delete con doble confirmación
    const hardDeleteItem = (id: number) => {
        // Primera confirmación
        showConfirm({
            title: `⚠️ Eliminar ${entityName} Permanentemente`,
            message: `¿Estás seguro de ELIMINAR PERMANENTEMENTE esta ${entityName.toLowerCase()}?\n\nEsta acción NO se puede deshacer.`,
            confirmText: 'Continuar',
            type: 'danger',
            onConfirm: async () => {
                // Cerrar el primer modal
                hideConfirm();

                // Pequeño delay y mostrar segundo modal
                setTimeout(() => {
                    showConfirm({
                        title: '⚠️ Confirmación Final',
                        message: `¿Realmente deseas eliminar esta ${entityName.toLowerCase()} de forma permanente?\n\nEsta es tu última oportunidad para cancelar.`,
                        confirmText: 'Eliminar Permanentemente',
                        type: 'danger',
                        onConfirm: async () => {
                            try {
                                const hardDeleteMethod = service.hardDeleteCategoria || service.hardDelete;
                                if (!hardDeleteMethod) {
                                    throw new Error('Método hardDelete no disponible');
                                }

                                const result = await hardDeleteMethod(id);
                                setSuccessMessage(result.message);
                                await loadItems();

                                setTimeout(() => setSuccessMessage(null), 3000);
                            } catch (err: any) {
                                setError(err.message || `Error al eliminar ${entityName.toLowerCase()}`);
                                setTimeout(() => setError(null), 5000);
                            }
                        },
                    });
                }, 100);
            },
        });
    };

    // Limpiar mensajes
    const clearMessages = () => {
        setError(null);
        setSuccessMessage(null);
    };

    return {
        // Estado
        items,
        loading,
        error,
        successMessage,
        filters,

        // Operaciones
        loadItems,
        createItem,
        updateItem,
        deleteItem,
        hardDeleteItem,

        // Helpers
        setFilters,
        clearMessages,

        // Modal
        confirmModal: modalState,
        handleConfirmAction: handleConfirm,
        handleCancelAction: hideConfirm,
    };
};
