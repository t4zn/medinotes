export type NavNode =
  | {
      title: string
      href: string
      noLink?: true
      heading?: string
      items?: NavNode[]
      isSectionLink?: boolean
      disabled?: boolean
      code?: string
      name?: string
    }
  | {
      spacer: true
    }

export const NAVIGATION_TREE: NavNode[] = [
  {
    heading: "Resources",
    title: "Program",
    href: "/basic-setup",
    noLink: true,
    items: [
      {
        title: "B.Tech",
        href: "/btech",
        noLink: true,
        items: [
          { title: "1st Year", href: "#", isSectionLink: true, disabled: true },
          {
            title: "CSE",
            href: "/cse",
            noLink: true,
            items: [
              {
                title: "2nd Year",
                href: "/2nd-year",
                noLink: true,
                items: [
                  { title: "Data Structures", href: "/notes", code: "CS3CO31", name: "Data Structures" },
                  { title: "DBMS", href: "/notes?subject=dbms", code: "CS3CO39", name: "Database Management Systems" },
                  { title: "OOP", href: "/notes?subject=oop", code: "CS3CO30", name: "Object Oriented Programming" },
                  { title: "Operating Systems", href: "/notes?subject=operating-systems", code: "CS3CO36", name: "Operating Systems" },
                ],
              },
              { title: "3rd Year", href: "#", isSectionLink: true, disabled: true },
              { title: "4th Year", href: "#", isSectionLink: true, disabled: true },
            ],
          },
          { title: "AI (IBM)", href: "#", isSectionLink: true, disabled: true },
          { title: "IT", href: "#", isSectionLink: true, disabled: true },
          { title: "CSBS", href: "#", isSectionLink: true, disabled: true },
          { title: "ECE", href: "#", isSectionLink: true, disabled: true },
          { title: "Robotics", href: "#", isSectionLink: true, disabled: true },
          { title: "Mechanical", href: "#", isSectionLink: true, disabled: true },
          { title: "Civil", href: "#", isSectionLink: true, disabled: true },
          { title: "Automobile", href: "#", isSectionLink: true, disabled: true },
          { title: "Electrical", href: "#", isSectionLink: true, disabled: true },
        ],
      },
      { title: "B.Sc", href: "#", isSectionLink: true, disabled: true },
      { title: "BBA", href: "#", isSectionLink: true, disabled: true },
      { title: "BCA", href: "#", isSectionLink: true, disabled: true },
      { title: "B.Com", href: "#", isSectionLink: true, disabled: true },
      { title: "B.Pharm", href: "#", isSectionLink: true, disabled: true },
      { title: "MBA", href: "#", isSectionLink: true, disabled: true },
    ],
  },
]

export interface CourseFileItem {
  id: string
  original_name: string
  created_at: string
  uploader_name: string
  uploader_avatar: string
  page_count: number
  category: "notes" | "pyqs"
}

export interface SyllabusUnit {
  unitName: string
  content: string
}

export interface CourseItem {
  code: string
  codeLower: string
  name: string
  title: string
  slug: string
  program: string
  programTitle: string
  branch: string
  branchTitle: string
  year: string
  yearTitle: string
  description: string
  shortSnippet: string
  keywords: string[]
  onlineCount: number
  notes: CourseFileItem[]
  pyqs: CourseFileItem[]
  units: SyllabusUnit[]
}

function makeStandardNotes(prefix: string): CourseFileItem[] {
  return [
    { id: `${prefix}-n1`, original_name: "Unit 1", created_at: "2025-09-12T10:00:00Z", uploader_name: "Taizun Kaptan", uploader_avatar: "/images/founders/taizun-kaptan.webp", page_count: 18, category: "notes" },
    { id: `${prefix}-n2`, original_name: "Unit 2", created_at: "2025-09-19T10:00:00Z", uploader_name: "Vansh Singh", uploader_avatar: "/images/founders/vansh-singh.webp", page_count: 22, category: "notes" },
    { id: `${prefix}-n3`, original_name: "Unit 3", created_at: "2025-09-28T10:00:00Z", uploader_name: "Sakina Hashmi", uploader_avatar: "/images/founders/sakina-hashmi.webp", page_count: 20, category: "notes" },
    { id: `${prefix}-n4`, original_name: "Unit 4", created_at: "2025-10-06T10:00:00Z", uploader_name: "Raina Sharma", uploader_avatar: "/images/founders/raina-sharma.webp", page_count: 24, category: "notes" },
  ]
}

function makeStandardPyqs(prefix: string): CourseFileItem[] {
  return [
    { id: `${prefix}-p1`, original_name: "End Sem 2026", created_at: "2026-01-15T10:00:00Z", uploader_name: "Taizun Kaptan", uploader_avatar: "/images/founders/taizun-kaptan.webp", page_count: 2, category: "pyqs" },
    { id: `${prefix}-p2`, original_name: "End Sem 2025", created_at: "2025-02-10T10:00:00Z", uploader_name: "Vansh Singh", uploader_avatar: "/images/founders/vansh-singh.webp", page_count: 2, category: "pyqs" },
    { id: `${prefix}-p3`, original_name: "End Sem 2024", created_at: "2024-02-14T10:00:00Z", uploader_name: "Sakina Hashmi", uploader_avatar: "/images/founders/sakina-hashmi.webp", page_count: 2, category: "pyqs" },
    { id: `${prefix}-p4`, original_name: "End Sem 2023", created_at: "2023-02-18T10:00:00Z", uploader_name: "Raina Sharma", uploader_avatar: "/images/founders/raina-sharma.webp", page_count: 2, category: "pyqs" },
  ]
}

export const COURSE_CATALOG: Record<string, CourseItem> = {
  "data-structures": {
    code: "CS3CO31",
    codeLower: "cs3co31",
    name: "Data Structures",
    title: "Data Structures",
    slug: "data-structures",
    program: "btech",
    programTitle: "B.Tech",
    branch: "cse",
    branchTitle: "CSE",
    year: "2nd-year",
    yearTitle: "2nd Year",
    description: "Arrays, linked lists, stacks, queues, trees, graphs, and algorithm complexity analysis.",
    shortSnippet: "Arrays, linked lists, trees & graphs",
    keywords: ["ds", "dsa", "cs3co31", "data structures"],
    onlineCount: 14,
    notes: makeStandardNotes("cs3co31"),
    pyqs: makeStandardPyqs("cs3co31"),
    units: [
      { unitName: "Unit I: Introduction to Data Structures & Arrays", content: "Definitions and Types of Data Structures, Concept of Linear and Non-Linear, Static and Dynamic, Primitive and Non-Primitive, Persistent and Non-Persistent Data structure, Overview of array, one dimensional array and multidimensional array, Pointers, Recursive functions." },
      { unitName: "Unit II: Linked Lists & Operations", content: "Concept of Linked List organization, Singly List, Doubly List, Circular list and doubly circular Linked List Operations: Linked list implementation of stack and queue, Applications of Linked List data structure." },
      { unitName: "Unit III: Stacks and Queues", content: "Stack, Primitive Stack operations, Array Implementation of Stack, Multiple Stack, Application of stack: Prefix and Postfix Expressions, Evaluation of postfix expression, Recursion, Tower of Hanoi Problem, Queue, Overview of Queue, Operations on Queue, Circular Queues, Array implementation of Queues, Dequeue and Priority Queue." },
      { unitName: "Unit IV: Searching and Sorting Techniques", content: "Searching and Sorting, Sequential search, Binary Search, Internal and external Sort, Bubble Sort, Selection Sort, Insertion Sort, Shell Sort, Radix Sort, Quick Sort and Merge Sort. Hashing: Hash Function, Collision Resolution Strategies, Storage Management: Garbage Collection and Compaction." },
      { unitName: "Unit V: Trees and Graphs", content: "Trees, Basic terminology, Binary Trees, Binary Tree Representation, Complete Binary Tree, Algebraic Expressions, Extended Binary Trees, Array and Linked Representation of Binary trees, Tree Traversal, Threaded Binary trees, AVL tree, Heaps Graphs, Basic terminology and types of Graph, Representations of Graphs, Graph Traversal." },
    ],
  },
  dbms: {
    code: "CS3CO39",
    codeLower: "cs3co39",
    name: "Database Management Systems",
    title: "DBMS",
    slug: "dbms",
    program: "btech",
    programTitle: "B.Tech",
    branch: "cse",
    branchTitle: "CSE",
    year: "2nd-year",
    yearTitle: "2nd Year",
    description: "Database design, SQL, normalization, transactions, and database administration.",
    shortSnippet: "Database design, SQL & normalization",
    keywords: ["database management systems", "sql", "cs3co39", "dbms"],
    onlineCount: 11,
    notes: makeStandardNotes("cs3co39"),
    pyqs: makeStandardPyqs("cs3co39"),
    units: [
      { unitName: "Unit I: Introduction to DBMS & Data Models", content: "Data Vs Information, Definition of Database, Advantages of Database Systems, Components of DBMS, DBMS Architecture and Data Independence, Data modelling, Entity Relationship Model, Relational, Network, Hierarchical and Object-Oriented Models. Data Modelling Using the Entity Relationship Model." },
      { unitName: "Unit II: Relational Model & Relational Algebra", content: "Relational Databases, Relational Algebra, Relational Algebra Operation, Tuple Relational Calculus, Domain Relational Calculus. Data Definition with SQL, Inserts, Delete and Update Statements in SQL, Views, Data Manipulation with SQL, PL/SQL constructs: Triggers, Cursors." },
      { unitName: "Unit III: SQL Queries, Joins & Views", content: "Database Design Guidelines, Key concepts, Relational Database Design, Integrity Constraints, Domain Constraints, Referential Integrity, Functional Dependency, decomposition, Normalization Using Functional Dependencies: Normal Forms, First, Second and Third Normal Forms. Boyce Codd Normal Form, Multivalued Dependencies and Fourth Normal Form, Join Dependencies and Fifth Normal Form, Decomposition in 2NF, 3NF and BCNF." },
      { unitName: "Unit IV: Database Design, Dependencies & Normalization", content: "Introduction to Transaction Processing, Transaction Concepts, Desirable Properties of Transactions, Schedules, Concepts of Recoverability and Serializability, Concurrency control: introduction, locking protocols." },
      { unitName: "Unit V: Transaction Processing, Concurrency Control & Recovery", content: "Query Processing and Optimization, File organization and indexes, hashing techniques, B tree, B+ tree. Introduction to advanced databases: Distributed databases, Object oriented databases, mobile and web databases, Introduction to data warehousing and mining." },
    ],
  },
  oop: {
    code: "CS3CO30",
    codeLower: "cs3co30",
    name: "Object Oriented Programming",
    title: "OOP",
    slug: "oop",
    program: "btech",
    programTitle: "B.Tech",
    branch: "cse",
    branchTitle: "CSE",
    year: "2nd-year",
    yearTitle: "2nd Year",
    description: "OOP concepts, classes, objects, inheritance, polymorphism, and design patterns.",
    shortSnippet: "Classes, inheritance & polymorphism",
    keywords: ["object oriented programming", "oops", "c++", "cs3co30"],
    onlineCount: 9,
    notes: makeStandardNotes("cs3co30"),
    pyqs: makeStandardPyqs("cs3co30"),
    units: [
      { unitName: "Unit I: Introduction to Object-Oriented Programming", content: "Introduction to object oriented programming Characteristics, Applications, difference between object oriented and procedure-based programming, object-oriented programming languages, Object oriented concepts: Abstraction, Encapsulation, Polymorphism, Inheritance and Information Hiding." },
      { unitName: "Unit II: Abstract Data Types, Objects and Classes", content: "Attributes and Methods, Objects as software units, Encapsulation and Information hiding, Objects instantiations and interactions, Object lifetime, Static and dynamic objects, global and local objects, Meta-class." },
      { unitName: "Unit III: Relationships Between Classes", content: "Association of objects, Types of Association, Recursive Association, Multiplicities, Navigability, Named association, Aggregation of objects. Types of Aggregation, Delegation, Modeling Association and Aggregation." },
      { unitName: "Unit IV: Inheritance and Polymorphism", content: "Types of polymorphism, Static and dynamic polymorphism, Operator and Method overloading, Inherited methods, Redefined methods, the protected interface, Abstract methods and classes, Public and protected properties, Private operations, Disinheritance, Multiple inheritance." },
      { unitName: "Unit V: Template Classes and Exception Handling", content: "Template Classes and Functions Container Classes, Container types, typical functions and iterator methods, Heterogeneous containers, Persistent objects, stream, and files, Object oriented programming languages." },
    ],
  },
  "operating-systems": {
    code: "CS3CO36",
    codeLower: "cs3co36",
    name: "Operating Systems",
    title: "Operating Systems",
    slug: "operating-systems",
    program: "btech",
    programTitle: "B.Tech",
    branch: "cse",
    branchTitle: "CSE",
    year: "2nd-year",
    yearTitle: "2nd Year",
    description: "Process management, memory management, file systems, and system programming.",
    shortSnippet: "Processes, memory & file systems",
    keywords: ["os", "cs3co36", "operating system"],
    onlineCount: 16,
    notes: makeStandardNotes("cs3co36"),
    pyqs: makeStandardPyqs("cs3co36"),
    units: [
      { unitName: "Unit I: Introduction to Operating Systems & Structure", content: "Introduction to OS. Operating system functions, evaluation of O.S., Different types of O.S.: Batch, Multi-Programmed, Time-Sharing, Real-Time, Distributed, Parallel. Process: Concept of Processes, Process Scheduling, Operations on Processes, Cooperating Processes, Inter-Process Communication. Precedence Graphs, Critical Section Problem, Semaphores, Threads." },
      { unitName: "Unit II: Process Management, Threads & CPU Scheduling", content: "Scheduling Criteria, Preemptive & Non-Preemptive Scheduling, Scheduling Algorithms, Algorithm Evaluation, Multi-Processor Scheduling, Deadlock: Deadlock Problem, Deadlock Characterization, Deadlock Prevention, Deadlock Avoidance, Deadlock Detection, Recovery From Deadlock, Methods for Deadlock Handling." },
      { unitName: "Unit III: Process Synchronization, Semaphores & Deadlocks", content: "Concepts of Memory Management, Logical and Physical Address Space, Swapping, Fixed and Dynamic Partitions, Best Fit, First Fit and Worst Fit Allocation, Paging, Segmentation, and Paging Combined With Segmentation." },
      { unitName: "Unit IV: Memory Management, Paging & Virtual Memory", content: "Concepts of Virtual Memory, Cache Memory Organization, Demand Paging, Page Replacement Algorithms, Allocation of Frames, Thrashing, Demand Segmentation, Role of Operating System in Security, Security Breaches, System Protection, and Password Management." },
      { unitName: "Unit V: File Systems & Disk Scheduling", content: "Disk Scheduling, File Concepts, File Manager, File Organization, Access Methods, Allocation Methods, Free Space Managements, Directory Systems, File Protection, File Organization & Access Mechanism, File Sharing Implement Issue, File Management in Linux, Introduction to Distributed System." },
    ],
  },
}

const SLUG_ALIASES: Record<string, string> = {
  "database-management-systems": "dbms",
  "object-oriented-programming": "oop",
}

export function getCourseBySlug(slug: string): CourseItem | undefined {
  const normalized = slug.toLowerCase()
  const resolved = SLUG_ALIASES[normalized] || normalized
  return COURSE_CATALOG[resolved]
}
