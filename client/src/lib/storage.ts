import { v4 as uuidv4 } from 'uuid';
import type { WorkflowSession, Step } from '@/types/workflow';

/**
 * Application data structure stored in LocalStorage
 */
interface AppData {
  version: '0.2';
  sessions: WorkflowSession[];
  currentSessionId: string | null;
  lastUpdated: string;
}

/**
 * WorkflowStorage - LocalStorage封装类
 *
 * 管理workflow sessions的持久化存储
 */
export class WorkflowStorage {
  private static readonly STORAGE_KEY = 'workflow-console-v0.2';

  /**
   * 加载所有数据
   */
  static load(): AppData | null {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) return null;

      const parsed = JSON.parse(data) as AppData;

      // 验证数据格式
      if (parsed.version !== '0.2') {
        console.warn('Data version mismatch, returning null');
        return null;
      }

      return parsed;
    } catch (error) {
      console.error('Failed to load data from LocalStorage:', error);
      return null;
    }
  }

  /**
   * 保存所有数据
   */
  static save(data: AppData): void {
    try {
      data.lastUpdated = new Date().toISOString();
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save data to LocalStorage:', error);
      throw error;
    }
  }

  /**
   * 清空所有数据
   */
  static clear(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * 获取所有sessions（按创建时间倒序）
   */
  static getSessions(): WorkflowSession[] {
    const data = this.load();
    if (!data) return [];

    return [...data.sessions].sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }

  /**
   * 获取单个session
   */
  static getSession(id: string): WorkflowSession | null {
    const data = this.load();
    if (!data) return null;

    return data.sessions.find(s => s.session_id === id) || null;
  }

  /**
   * 获取当前选中的session ID
   */
  static getCurrentSessionId(): string | null {
    const data = this.load();
    return data?.currentSessionId || null;
  }

  /**
   * 设置当前选中的session ID
   */
  static setCurrentSessionId(id: string | null): void {
    const data = this.load();
    if (!data) return;

    data.currentSessionId = id;
    this.save(data);
  }

  /**
   * 新建session
   */
  static addSession(session: Omit<WorkflowSession, 'session_id' | 'created_at' | 'steps'>): string {
    const data = this.load();
    if (!data) {
      throw new Error('Storage not initialized');
    }

    const newSession: WorkflowSession = {
      session_id: uuidv4(),
      created_at: new Date().toISOString(),
      steps: [],
      ...session,
    };

    data.sessions.push(newSession);
    data.currentSessionId = newSession.session_id;
    this.save(data);

    return newSession.session_id;
  }

  /**
   * 更新session元数据
   */
  static updateSession(id: string, updates: Partial<Omit<WorkflowSession, 'session_id' | 'created_at' | 'steps'>>): void {
    const data = this.load();
    if (!data) throw new Error('Storage not initialized');

    const session = data.sessions.find(s => s.session_id === id);
    if (!session) throw new Error(`Session ${id} not found`);

    Object.assign(session, updates);
    this.save(data);
  }

  /**
   * 删除session
   */
  static deleteSession(id: string): void {
    const data = this.load();
    if (!data) throw new Error('Storage not initialized');

    const index = data.sessions.findIndex(s => s.session_id === id);
    if (index === -1) throw new Error(`Session ${id} not found`);

    data.sessions.splice(index, 1);

    // 如果删除的是当前session，切换到第一个
    if (data.currentSessionId === id) {
      data.currentSessionId = data.sessions.length > 0
        ? data.sessions[0].session_id
        : null;
    }

    this.save(data);
  }

  /**
   * 复制session
   */
  static duplicateSession(id: string): string {
    const data = this.load();
    if (!data) throw new Error('Storage not initialized');

    const session = data.sessions.find(s => s.session_id === id);
    if (!session) throw new Error(`Session ${id} not found`);

    const newSession: WorkflowSession = {
      ...session,
      session_id: uuidv4(),
      title: `${session.title} (Copy)`,
      created_at: new Date().toISOString(),
      steps: session.steps.map(step => ({
        ...step,
        id: uuidv4(),
      })),
    };

    data.sessions.push(newSession);
    data.currentSessionId = newSession.session_id;
    this.save(data);

    return newSession.session_id;
  }

  /**
   * 新建step
   */
  static addStep(
    sessionId: string,
    step: Omit<Step, 'id' | 'order' | 'timestamp'>
  ): string {
    const data = this.load();
    if (!data) throw new Error('Storage not initialized');

    const session = data.sessions.find(s => s.session_id === sessionId);
    if (!session) throw new Error(`Session ${sessionId} not found`);

    const maxOrder = session.steps.length > 0
      ? Math.max(...session.steps.map(s => s.order))
      : 0;

    const newStep: Step = {
      id: uuidv4(),
      order: maxOrder + 1,
      timestamp: new Date().toISOString(),
      ...step,
    };

    session.steps.push(newStep);
    this.save(data);

    return newStep.id;
  }

  /**
   * 更新step
   */
  static updateStep(
    sessionId: string,
    stepId: string,
    updates: Partial<Omit<Step, 'id' | 'order' | 'timestamp'>>
  ): void {
    const data = this.load();
    if (!data) throw new Error('Storage not initialized');

    const session = data.sessions.find(s => s.session_id === sessionId);
    if (!session) throw new Error(`Session ${sessionId} not found`);

    const step = session.steps.find(s => s.id === stepId);
    if (!step) throw new Error(`Step ${stepId} not found`);

    Object.assign(step, updates);
    this.save(data);
  }

  /**
   * 删除step
   */
  static deleteStep(sessionId: string, stepId: string): void {
    const data = this.load();
    if (!data) throw new Error('Storage not initialized');

    const session = data.sessions.find(s => s.session_id === sessionId);
    if (!session) throw new Error(`Session ${sessionId} not found`);

    const index = session.steps.findIndex(s => s.id === stepId);
    if (index === -1) throw new Error(`Step ${stepId} not found`);

    session.steps.splice(index, 1);

    // 重新计算order
    session.steps
      .sort((a, b) => a.order - b.order)
      .forEach((step, idx) => {
        step.order = idx + 1;
      });

    this.save(data);
  }

  /**
   * 向左移动step（顺序前移1格）
   */
  static moveStepLeft(sessionId: string, stepId: string): void {
    const data = this.load();
    if (!data) throw new Error('Storage not initialized');

    const session = data.sessions.find(s => s.session_id === sessionId);
    if (!session) throw new Error(`Session ${sessionId} not found`);

    const sortedSteps = [...session.steps].sort((a, b) => a.order - b.order);
    const currentIndex = sortedSteps.findIndex(s => s.id === stepId);

    // 如果已是第一个step，无法继续前移
    if (currentIndex <= 0) return;

    // 交换当前step和前一个step的order值
    const currentStep = sortedSteps[currentIndex];
    const previousStep = sortedSteps[currentIndex - 1];
    const tempOrder = currentStep.order;
    currentStep.order = previousStep.order;
    previousStep.order = tempOrder;

    this.save(data);
  }

  /**
   * 初始化存储（从静态JSON迁移）
   */
  static async initialize(): Promise<void> {
    const existing = this.load();

    // 如果已有数据，不需要初始化
    if (existing) {
      console.log('Storage already initialized');
      return;
    }

    try {
      // 从静态文件加载初始数据
      const response = await fetch('/data/workflow-log-sample.json');
      if (!response.ok) {
        throw new Error('Failed to load sample data');
      }

      const session: WorkflowSession = await response.json();

      const initialData: AppData = {
        version: '0.2',
        sessions: [session],
        currentSessionId: session.session_id,
        lastUpdated: new Date().toISOString(),
      };

      this.save(initialData);
      console.log('Storage initialized with sample data');
    } catch (error) {
      console.error('Failed to initialize storage:', error);

      // 即使失败，也创建空数据
      const emptyData: AppData = {
        version: '0.2',
        sessions: [],
        currentSessionId: null,
        lastUpdated: new Date().toISOString(),
      };

      this.save(emptyData);
      console.log('Storage initialized with empty data');
    }
  }
}
